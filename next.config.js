/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Subdomain routing is handled at runtime by middleware.js.
   *
   * For local development, visit the dashboard at:
   *   http://localhost:3000/app     (direct path — always works)
   *   http://localhost:3000?_host=app  (simulates app.xoxo.ai)
   *
   * In production on Vercel:
   *   1. Add xoxo.ai as a custom domain
   *   2. Add app.xoxo.ai as a custom domain (same Vercel project)
   *   3. Middleware splits traffic at runtime — no second deployment needed
   *
   * edge.xoxo.ai is a separate Cloudflare Worker (see /worker/).
   */

  // Allow images from expected origins
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.xoxo.ai" },
    ],
  },

  // Strict mode to surface React issues early
  reactStrictMode: true,

  // Headers for security & performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
