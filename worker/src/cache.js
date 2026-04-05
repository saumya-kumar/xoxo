/**
 * Edge cache — two-tier storage:
 *   KV  → metadata + small payloads  (< 25 KB, fast reads)
 *   R2  → large HTML payloads         (>= 25 KB, cheaper at scale)
 */

const SMALL_PAYLOAD_LIMIT = 25 * 1024; // 25 KB

/**
 * Generate a stable cache key from a URL.
 * Strips tracking params (utm_*, fbclid, etc.) so bots hitting
 * the same page with different query strings share one cache entry.
 */
export function cacheKey(url) {
  try {
    const u = new URL(url);
    // Strip known tracking params
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","gclid","_ga"].forEach(
      (p) => u.searchParams.delete(p)
    );
    // Sort remaining params for stability
    u.searchParams.sort();
    return `cache:${u.hostname}${u.pathname}${u.search}`;
  } catch {
    return `cache:${url}`;
  }
}

/**
 * Try to get a cached response for a URL.
 * Returns { payload, contentType } or null.
 */
export async function getCache(url, { CACHE, CACHE_STORE }) {
  const key = cacheKey(url);
  const meta = await CACHE.get(key, { type: "json" });
  if (!meta) return null;

  let payload;
  if (meta.store === "r2") {
    const obj = await CACHE_STORE.get(key);
    if (!obj) return null;
    payload = await obj.text();
  } else {
    payload = meta.payload;
  }

  return { payload, contentType: meta.contentType ?? "text/html; charset=utf-8" };
}

/**
 * Store a fetched response in the edge cache.
 * Automatically picks KV vs R2 based on payload size.
 */
export async function setCache(url, payload, contentType, ttl, { CACHE, CACHE_STORE }) {
  const key = cacheKey(url);
  const bytes = new TextEncoder().encode(payload).length;

  if (bytes >= SMALL_PAYLOAD_LIMIT) {
    // Store in R2, keep only metadata in KV
    await CACHE_STORE.put(key, payload, {
      httpMetadata: { contentType },
      customMetadata: { url, cachedAt: Date.now().toString() },
    });
    await CACHE.put(key, JSON.stringify({ store: "r2", contentType }), { expirationTtl: ttl });
  } else {
    // Small payload — store inline in KV
    await CACHE.put(key, JSON.stringify({ store: "kv", payload, contentType }), {
      expirationTtl: ttl,
    });
  }
}

/**
 * Purge a specific URL from cache (both KV and R2).
 */
export async function purgeCache(url, { CACHE, CACHE_STORE }) {
  const key = cacheKey(url);
  await Promise.all([
    CACHE.delete(key),
    CACHE_STORE.delete(key).catch(() => {}), // R2 delete is best-effort
  ]);
}

/**
 * Build a compact structured JSON response for retrieval agents.
 * 10x smaller than full HTML — contains just title, description,
 * headings, body text, and metadata.
 */
export function buildStructuredPayload(html, url) {
  // Lightweight extraction without a DOM parser (Workers environment)
  const title   = (html.match(/<title[^>]*>([^<]*)<\/title>/i) ?? [])[1]?.trim() ?? "";
  const desc    = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i) ?? [])[1]?.trim() ?? "";
  const h1s     = [...html.matchAll(/<h1[^>]*>([^<]*)<\/h1>/gi)].map((m) => m[1].trim()).filter(Boolean);
  const h2s     = [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)].map((m) => m[1].trim()).filter(Boolean);

  // Strip tags for body text (rough)
  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);

  return JSON.stringify({
    url,
    title,
    description: desc,
    headings: { h1: h1s, h2: h2s },
    body: bodyText,
    cached_at: new Date().toISOString(),
    source: "xoxo-edge-v1",
  });
}
