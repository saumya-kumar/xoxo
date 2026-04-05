/**
 * Bot classifier — rule-based v1.
 *
 * Returns: { type, action, confidence }
 *
 * type:   "training" | "retrieval" | "search" | "disguised" | "human"
 * action: "serve_cache" | "block" | "passthrough"
 *
 * Phase 2 will layer ML scoring on top via a D1 model.
 */

// ── Known bot signatures ───────────────────────────────────────────────────
const KNOWN_BOTS = [
  // Training scrapers — high volume, cache by default
  { pattern: /GPTBot/i,           name: "GPTBot",         owner: "OpenAI",        type: "training",  defaultAction: "serve_cache" },
  { pattern: /ClaudeBot/i,        name: "ClaudeBot",      owner: "Anthropic",     type: "training",  defaultAction: "serve_cache" },
  { pattern: /CCBot/i,            name: "CCBot",          owner: "Common Crawl",  type: "training",  defaultAction: "serve_cache" },
  { pattern: /anthropic-ai/i,     name: "Claude",         owner: "Anthropic",     type: "training",  defaultAction: "serve_cache" },
  { pattern: /cohere-ai/i,        name: "CohereBot",      owner: "Cohere",        type: "training",  defaultAction: "serve_cache" },
  { pattern: /Bytespider/i,       name: "Bytespider",     owner: "ByteDance",     type: "training",  defaultAction: "serve_cache" },
  { pattern: /PetalBot/i,         name: "PetalBot",       owner: "Huawei",        type: "training",  defaultAction: "serve_cache" },
  { pattern: /DataForSeoBot/i,    name: "DataForSeoBot",  owner: "DataForSeo",    type: "training",  defaultAction: "block"       },

  // Retrieval agents — serve compact JSON
  { pattern: /PerplexityBot/i,    name: "PerplexityBot",  owner: "Perplexity",    type: "retrieval", defaultAction: "serve_cache" },
  { pattern: /OAI-SearchBot/i,    name: "OAI-SearchBot",  owner: "OpenAI",        type: "retrieval", defaultAction: "serve_cache" },
  { pattern: /YouBot/i,           name: "YouBot",         owner: "You.com",       type: "retrieval", defaultAction: "serve_cache" },
  { pattern: /Applebot/i,         name: "Applebot",       owner: "Apple",         type: "retrieval", defaultAction: "serve_cache" },

  // Search crawlers — allow (SEO value)
  { pattern: /Googlebot/i,        name: "Googlebot",      owner: "Google",        type: "search",    defaultAction: "passthrough" },
  { pattern: /Bingbot/i,          name: "Bingbot",        owner: "Microsoft",     type: "search",    defaultAction: "passthrough" },
  { pattern: /DuckDuckBot/i,      name: "DuckDuckBot",    owner: "DuckDuckGo",    type: "search",    defaultAction: "passthrough" },
  { pattern: /Slurp/i,            name: "YahooSlurp",     owner: "Yahoo",         type: "search",    defaultAction: "passthrough" },
  { pattern: /YandexBot/i,        name: "YandexBot",      owner: "Yandex",        type: "search",    defaultAction: "passthrough" },
];

// ── Disguised bot signals ──────────────────────────────────────────────────
// Bots that fake Chrome/Safari/Firefox UAs but reveal themselves via other signals.
const DISGUISED_BOT_IP_RANGES = [
  // Common Crawl ranges (sample — expand from real traffic data)
  /^40\.77\./,
  /^157\.55\./,
  /^199\.59\./,
];

const HEADLESS_UA_SIGNALS = [
  /HeadlessChrome/i,
  /PhantomJS/i,
  /Selenium/i,
  /webdriver/i,
  /puppeteer/i,
  /playwright/i,
];

const BOT_HEADER_FINGERPRINTS = [
  "x-forwarded-for",   // legitimate proxies set this, scrapers sometimes strip it oddly
  "cf-ipcountry",
];

/**
 * Classify a request.
 *
 * @param {{ ua: string, ip: string, url: string, headers: Record<string,string> }} req
 * @returns {{ type: string, name: string, owner: string, action: string, confidence: number }}
 */
export function classify({ ua = "", ip = "", url = "", headers = {} }) {
  // 1. Check against known bot signatures
  for (const bot of KNOWN_BOTS) {
    if (bot.pattern.test(ua)) {
      return {
        type:       bot.type,
        name:       bot.name,
        owner:      bot.owner,
        action:     bot.defaultAction,
        confidence: 0.99,
      };
    }
  }

  // 2. Headless browser signals
  for (const sig of HEADLESS_UA_SIGNALS) {
    if (sig.test(ua)) {
      return {
        type: "disguised", name: "Headless browser", owner: "Unknown",
        action: "block", confidence: 0.95,
      };
    }
  }

  // 3. IP-based disguised bot detection
  for (const range of DISGUISED_BOT_IP_RANGES) {
    if (range.test(ip)) {
      return {
        type: "disguised", name: "Unknown scraper", owner: "Unknown",
        action: "block", confidence: 0.85,
      };
    }
  }

  // 4. Missing UA — almost always a bot
  if (!ua || ua.trim() === "") {
    return {
      type: "disguised", name: "No user-agent", owner: "Unknown",
      action: "block", confidence: 0.9,
    };
  }

  // 5. Behavioural heuristics — very short UA strings
  if (ua.length < 20 && !/Mozilla/i.test(ua)) {
    return {
      type: "disguised", name: "Suspicious UA", owner: "Unknown",
      action: "block", confidence: 0.75,
    };
  }

  // 6. Default: human
  return {
    type: "human", name: "Human visitor", owner: null,
    action: "passthrough", confidence: 0.8,
  };
}
