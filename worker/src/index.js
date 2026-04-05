/**
 * XOXO Edge Worker — edge.xoxo.ai
 *
 * Endpoints:
 *   POST /v1/classify   →  classify a request, serve from cache or passthrough
 *   POST /v1/purge      →  purge a URL from edge cache
 *   GET  /v1/stats      →  savings stats for a publisher
 *   GET  /llms.txt      →  serve llms.txt for a domain (called by publisher's Worker)
 *   GET  /v1/health     →  health check
 */

import { classify }          from "./bot-classifier.js";
import { getCache, setCache, purgeCache, buildStructuredPayload } from "./cache.js";
import { getLlmsTxt }        from "./llms-txt.js";
import { authenticate, applyPolicy } from "./auth.js";
import { emitSavingsEvent }  from "./analytics.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-URL, X-UA, X-IP",
};

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url     = new URL(request.url);
    const path    = url.pathname;
    const method  = request.method;

    try {
      // ── GET /v1/health ──────────────────────────────────────────────────
      if (path === "/v1/health" && method === "GET") {
        return json({ ok: true, version: "1.0.0", ts: Date.now() });
      }

      // ── GET /llms.txt ───────────────────────────────────────────────────
      // Called by publisher Workers: GET /llms.txt?domain=techcrunch.com
      if (path === "/llms.txt" && method === "GET") {
        const domain = url.searchParams.get("domain");
        if (!domain) return err("domain param required", 400);

        // Light auth: check API key is valid for this domain
        const auth = await authenticate(request, env.PUBLISHER_CONFIG);
        if (!auth.ok) return err(auth.error, auth.status);
        if (auth.config.domain !== domain) return err("Domain mismatch", 403);

        const txt = await getLlmsTxt(domain, env);
        return new Response(txt, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400", ...CORS_HEADERS },
        });
      }

      // ── POST /v1/classify ────────────────────────────────────────────────
      if (path === "/v1/classify" && method === "POST") {
        // 1. Authenticate
        const auth = await authenticate(request, env.PUBLISHER_CONFIG);
        if (!auth.ok) return err(auth.error, auth.status);
        const { config } = auth;

        // 2. Parse request headers passed by the publisher's Worker
        const targetUrl = request.headers.get("X-URL") ?? "";
        const ua        = request.headers.get("X-UA")  ?? "";
        const ip        = request.headers.get("X-IP")  ?? "";

        if (!targetUrl) return err("X-URL header required", 400);

        // 3. Handle llms.txt requests — serve auto-generated file
        if (new URL(targetUrl).pathname === "/llms.txt") {
          const txt = await getLlmsTxt(config.domain, env);
          return json({ action: "serve_cache", payload: txt, contentType: "text/plain; charset=utf-8" });
        }

        // 4. Classify
        let result = classify({ ua, ip, url: targetUrl });

        // 5. Apply publisher policy overrides
        result = applyPolicy(result, config);

        // 6. If blocking — no cache needed
        if (result.action === "block") {
          emitSavingsEvent(env.ANALYTICS, {
            publisherId: config.publisherId,
            botName:     result.name,
            botType:     result.type,
            action:      "block",
          });
          return json({ action: "block", type: result.type, bot: result.name });
        }

        // 7. Human / search — pass through to origin
        if (result.action === "passthrough") {
          return json({ action: "passthrough", type: result.type });
        }

        // 8. serve_cache — check cache first (Phase 2: warm)
        const cached = await getCache(targetUrl, env);
        if (cached) {
          emitSavingsEvent(env.ANALYTICS, {
            publisherId:  config.publisherId,
            botName:      result.name,
            botType:      result.type,
            action:       "serve_cache",
            payloadBytes: new TextEncoder().encode(cached.payload).length,
          });
          return json({ action: "serve_cache", payload: cached.payload, contentType: cached.contentType, cacheHit: true });
        }

        // 9. Cache miss (Phase 1: cold) — fetch from origin, store, return
        const originRes = await fetch(targetUrl, {
          headers: {
            "User-Agent":     ua,
            "X-Forwarded-For": ip,
            "X-XOXO-Proxy":   "1",
          },
          cf: { cacheTtl: 0 }, // don't use CF's own cache — we manage ours
        });

        if (!originRes.ok) {
          return json({ action: "passthrough", type: result.type, error: "origin_error" });
        }

        const html        = await originRes.text();
        const contentType = originRes.headers.get("content-type") ?? "text/html; charset=utf-8";
        const ttl         = config.cacheTtl ?? 3600;

        // For retrieval agents, serve compact structured JSON
        let payload = html;
        let servedContentType = contentType;
        if (result.type === "retrieval") {
          payload = buildStructuredPayload(html, targetUrl);
          servedContentType = "application/json; charset=utf-8";
        }

        // Store in edge cache (async — don't block response)
        setCache(targetUrl, payload, servedContentType, ttl, env).catch(() => {});

        emitSavingsEvent(env.ANALYTICS, {
          publisherId:  config.publisherId,
          botName:      result.name,
          botType:      result.type,
          action:       "serve_cache",
          payloadBytes: 0, // cold — no bytes saved yet
        });

        return json({ action: "serve_cache", payload, contentType: servedContentType, cacheHit: false });
      }

      // ── POST /v1/purge ───────────────────────────────────────────────────
      if (path === "/v1/purge" && method === "POST") {
        const auth = await authenticate(request, env.PUBLISHER_CONFIG);
        if (!auth.ok) return err(auth.error, auth.status);

        const body = await request.json().catch(() => ({}));
        const { url: purgeUrl } = body;

        if (!purgeUrl) return err("url field required", 400);

        // Validate the URL belongs to the publisher's domain
        const parsedPurge = new URL(purgeUrl);
        if (parsedPurge.hostname !== auth.config.domain) {
          return err("URL domain does not match your account domain", 403);
        }

        await purgeCache(purgeUrl, env);

        return json({ ok: true, purged: purgeUrl });
      }

      // ── GET /v1/stats ────────────────────────────────────────────────────
      if (path === "/v1/stats" && method === "GET") {
        const auth = await authenticate(request, env.PUBLISHER_CONFIG);
        if (!auth.ok) return err(auth.error, auth.status);

        const period = url.searchParams.get("period") ?? "30d";

        // In production this queries Analytics Engine via Workers API.
        // For now, return the structure so the dashboard can wire up.
        return json({
          domain:               auth.config.domain,
          period,
          saved_usd:            5280,
          origin_calls_blocked: 1_400_000,
          bandwidth_saved_gb:   940,
          bot_share:            0.51,
          plan:                 auth.config.plan,
          note:                 "Live data available after Analytics Engine integration",
        });
      }

      return err("Not found", 404);

    } catch (e) {
      console.error("Worker error:", e);
      return err("Internal server error", 500);
    }
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS },
  });
}

function err(message, status = 400) {
  return json({ error: message }, status);
}
