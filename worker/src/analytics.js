/**
 * Savings analytics — writes events to Cloudflare Analytics Engine.
 *
 * Each bot-intercepted request emits one event with:
 *   - publisherId
 *   - botType / botName
 *   - action taken
 *   - bytes saved (estimated from cached payload size)
 *   - compute unit cost saved (estimated at $0.000002 per origin request)
 *
 * The dashboard reads these via Cloudflare Workers Analytics Engine API.
 */

const ORIGIN_COST_PER_REQUEST = 0.000002; // $0.000002 per avoided origin hit (conservative)
const BANDWIDTH_COST_PER_GB   = 0.09;     // $0.09/GB bandwidth savings (AWS CloudFront pricing)

export function emitSavingsEvent(ANALYTICS, { publisherId, botName, botType, action, payloadBytes = 0 }) {
  if (!ANALYTICS) return; // not available in local dev

  const computeSaved   = action !== "passthrough" ? ORIGIN_COST_PER_REQUEST : 0;
  const bandwidthSaved = action === "serve_cache"  ? (payloadBytes / 1e9) * BANDWIDTH_COST_PER_GB : 0;

  ANALYTICS.writeDataPoint({
    blobs: [publisherId, botName, botType, action],
    doubles: [computeSaved, bandwidthSaved, payloadBytes],
    indexes: [publisherId],
  });
}
