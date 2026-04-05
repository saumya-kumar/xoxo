/**
 * API key authentication.
 *
 * Keys are stored in KV as:
 *   key:xo_live_sk_<id>  →  JSON publisher config
 *
 * Publisher config shape:
 * {
 *   publisherId: "pub_123",
 *   domain: "techcrunch.com",
 *   plan: "publisher",          // "starter" | "publisher" | "enterprise"
 *   cacheTtl: 3600,
 *   policy: {
 *     training:  "serve_cache", // "serve_cache" | "block" | "passthrough"
 *     retrieval: "serve_cache",
 *     search:    "passthrough",
 *     disguised: "block",
 *     overrides: { GPTBot: "block" }
 *   },
 *   createdAt: "2026-04-01T00:00:00Z"
 * }
 */

const KEY_PREFIX = "key:";

export async function authenticate(request, PUBLISHER_CONFIG) {
  const authHeader = request.headers.get("Authorization") ?? "";
  const match = authHeader.match(/^Bearer\s+(xo_(?:live|test)_sk_\S+)$/);
  if (!match) return { ok: false, error: "Missing or malformed Authorization header", status: 401 };

  const apiKey = match[1];
  const config = await PUBLISHER_CONFIG.get(`${KEY_PREFIX}${apiKey}`, { type: "json" });
  if (!config) return { ok: false, error: "Invalid API key", status: 403 };

  return { ok: true, config };
}

/**
 * Apply publisher policy overrides on top of the default classifier action.
 */
export function applyPolicy(classifierResult, config) {
  const { policy = {} } = config;
  const { type, name } = classifierResult;

  // Per-bot override takes highest precedence
  if (policy.overrides?.[name]) {
    return { ...classifierResult, action: policy.overrides[name], policyApplied: true };
  }

  // Category-level default
  const categoryAction = policy[type];
  if (categoryAction) {
    return { ...classifierResult, action: categoryAction, policyApplied: true };
  }

  return { ...classifierResult, policyApplied: false };
}
