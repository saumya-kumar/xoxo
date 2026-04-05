import Nav from "../../components/nav";
import Footer from "../../components/footer";

export const metadata = { title: "Documentation" };

const css = `
.xo-docs-layout { display: flex; max-width: 1100px; margin: 0 auto; padding: 0 48px; min-height: calc(100vh - 128px); }
.xo-docs-sidebar {
  width: 220px; flex-shrink: 0; padding: 40px 0; position: sticky;
  top: 64px; height: calc(100vh - 64px); overflow-y: auto;
}
.xo-docs-nav-sec { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 8px; margin-top: 20px; }
.xo-docs-nav-sec:first-child { margin-top: 0; }
.xo-docs-nav-link { display: block; font-size: 13px; color: var(--ink-60); padding: 4px 0; transition: color 0.2s; text-decoration: none; }
.xo-docs-nav-link:hover { color: var(--ink); }
.xo-docs-nav-link.active { color: var(--green); font-weight: 500; }
.xo-docs-main { flex: 1; padding: 40px 0 40px 48px; min-width: 0; }
.xo-docs-main h1 { font-size: clamp(24px, 3vw, 36px); font-weight: 500; letter-spacing: -0.03em; margin-bottom: 12px; line-height: 1.15; }
.xo-docs-main h2 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; margin: 40px 0 12px; }
.xo-docs-main h3 { font-size: 16px; font-weight: 500; margin: 28px 0 10px; }
.xo-docs-main p { font-size: 14px; color: var(--ink-60); line-height: 1.85; margin-bottom: 16px; max-width: 620px; }
.xo-docs-main ul { padding-left: 20px; margin-bottom: 16px; }
.xo-docs-main li { font-size: 14px; color: var(--ink-60); line-height: 1.85; margin-bottom: 6px; }
.xo-docs-code {
  background: var(--ink); border-radius: 6px; padding: 20px 22px;
  font-size: 12px; line-height: 1.85; color: rgba(255,255,255,0.6);
  margin: 16px 0; font-family: var(--font-mono); overflow-x: auto;
}
.xo-docs-code .kw { color: var(--green); }
.xo-docs-code .str { color: #a8e6b8; }
.xo-docs-code .cm { color: rgba(255,255,255,0.2); font-style: italic; }
.xo-tag-green { display: inline-flex; align-items: center; font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 100px; background: var(--green-lt); color: var(--green-dk); margin-left: 8px; }
.xo-docs-sep { height: 1px; background: var(--ink-06); margin: 40px 0; }
.xo-docs-card { border: 1px solid var(--ink-12); border-radius: 6px; padding: 20px 24px; margin-bottom: 12px; }
.xo-docs-card-title { font-size: 14px; font-weight: 500; margin-bottom: 6px; }
.xo-docs-card-desc { font-size: 13px; color: var(--ink-60); line-height: 1.6; }
@media (max-width: 768px) {
  .xo-docs-layout { flex-direction: column; padding: 0 20px; }
  .xo-docs-sidebar { width: 100%; height: auto; position: static; padding: 20px 0 0; }
  .xo-docs-main { padding: 20px 0; }
}
`;

export default function DocsPage() {
  return (
    <>
      <style>{css}</style>
      <Nav />
      <div className="xo-docs-layout">
        <div className="xo-docs-sidebar">
          <div className="xo-docs-nav-sec">Getting started</div>
          <a href="#quickstart" className="xo-docs-nav-link active">Quickstart</a>
          <a href="#cloudflare" className="xo-docs-nav-link">Cloudflare Worker</a>
          <a href="#other-cdn" className="xo-docs-nav-link">Other CDNs</a>
          <div className="xo-docs-nav-sec">Core concepts</div>
          <a href="#classification" className="xo-docs-nav-link">Bot classification</a>
          <a href="#cache" className="xo-docs-nav-link">Edge cache</a>
          <a href="#llms-txt" className="xo-docs-nav-link">llms.txt</a>
          <div className="xo-docs-nav-sec">Dashboard</div>
          <a href="#overview" className="xo-docs-nav-link">Overview</a>
          <a href="#policy" className="xo-docs-nav-link">Policy controls</a>
          <a href="#webhooks" className="xo-docs-nav-link">Webhooks</a>
          <div className="xo-docs-nav-sec">API reference</div>
          <a href="#api-classify" className="xo-docs-nav-link">POST /classify</a>
          <a href="#api-purge" className="xo-docs-nav-link">POST /purge</a>
          <a href="#api-stats" className="xo-docs-nav-link">GET /stats</a>
        </div>

        <main className="xo-docs-main">
          <h1 id="quickstart">Integration docs <span className="xo-tag-green">v1</span></h1>
          <p>XOXO works at the edge — between the internet and your origin server. Setup takes under 10 minutes and requires zero changes to your website code.</p>

          <h2 id="cloudflare">Method 1: Cloudflare Worker <span className="xo-tag-green">Recommended</span></h2>
          <p>For publishers already behind Cloudflare (most serious publishers are). This method takes 5 minutes.</p>
          <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={{ fontSize: 14, color: "var(--ink-60)", lineHeight: 1.85, marginBottom: 8 }}>Go to <strong>Cloudflare Dashboard → Workers &amp; Pages → Create</strong></li>
            <li style={{ fontSize: 14, color: "var(--ink-60)", lineHeight: 1.85, marginBottom: 8 }}>Paste the XOXO Worker script (generated on signup, unique to your domain)</li>
            <li style={{ fontSize: 14, color: "var(--ink-60)", lineHeight: 1.85, marginBottom: 8 }}>Add a route: <code style={{ background: "var(--surface)", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>yourdomain.com/*</code></li>
            <li style={{ fontSize: 14, color: "var(--ink-60)", lineHeight: 1.85 }}>Save and deploy — you&apos;re live</li>
          </ol>

          <div className="xo-docs-code">
            <span className="cm">// XOXO Worker — generated on signup for your domain</span>{"\n"}
            <span className="kw">const</span> XOXO_KEY = <span className="str">"xo_live_sk_YOUR_KEY"</span>;{"\n\n"}
            <span className="kw">export default</span> {"{"}{"\n"}
            {"  "}<span className="kw">async</span> fetch(request, env) {"{"}{"\n"}
            {"    "}<span className="kw">const</span> res = <span className="kw">await</span> fetch(<span className="str">"https://edge.xoxo.ai/v1/classify"</span>, {"{"}{"\n"}
            {"      "}method: <span className="str">"POST"</span>,{"\n"}
            {"      "}headers: {"{"}{"\n"}
            {"        "}<span className="str">"Authorization"</span>: <span className="str">{"`Bearer ${XOXO_KEY}`"}</span>,{"\n"}
            {"        "}<span className="str">"X-URL"</span>: request.url,{"\n"}
            {"        "}<span className="str">"X-UA"</span>: request.headers.get(<span className="str">"user-agent"</span>) || <span className="str">""</span>,{"\n"}
            {"        "}<span className="str">"X-IP"</span>: request.headers.get(<span className="str">"cf-connecting-ip"</span>) || <span className="str">""</span>,{"\n"}
            {"      "}{"}"}{"}"}{"\n"}
            {"    "});{"\n"}
            {"    "}<span className="kw">const</span> {"{ action, payload }"} = <span className="kw">await</span> res.json();{"\n"}
            {"    "}<span className="kw">if</span> (action === <span className="str">"serve_cache"</span>) <span className="kw">return new</span> Response(payload, {"{ status: 200 }"});{"\n"}
            {"    "}<span className="kw">if</span> (action === <span className="str">"block"</span>) <span className="kw">return new</span> Response(<span className="str">"403"</span>, {"{ status: 403 }"});{"\n"}
            {"    "}<span className="kw">return</span> fetch(request); <span className="cm">// pass through to origin</span>{"\n"}
            {"  "}{"}"}
            {"\n"}{"}"}
          </div>

          <div className="xo-docs-sep" />

          <h2 id="other-cdn">Method 2: Other CDNs / Reverse proxy</h2>
          <p>For publishers on Fastly, Vercel Edge, AWS CloudFront, or nginx. Add a subrequest to XOXO before passing traffic to your origin. No website code changes required.</p>

          <div className="xo-docs-card">
            <div className="xo-docs-card-title">nginx config block</div>
            <div className="xo-docs-card-desc">Add to your server block before the proxy_pass directive. Fires a subrequest to XOXO&apos;s classify endpoint and uses the response to route the request.</div>
          </div>
          <div className="xo-docs-card">
            <div className="xo-docs-card-title">Fastly VCL</div>
            <div className="xo-docs-card-desc">Available in the XOXO dashboard under Settings → Integrations → Fastly. Generates a custom VCL snippet for your service.</div>
          </div>
          <div className="xo-docs-card">
            <div className="xo-docs-card-title">Vercel Edge Middleware</div>
            <div className="xo-docs-card-desc">Drop a <code style={{ background: "var(--surface)", padding: "2px 4px", borderRadius: 3, fontSize: 12 }}>middleware.ts</code> file at the root of your Next.js project. XOXO provides a middleware helper package.</div>
          </div>

          <div className="xo-docs-sep" />

          <h2 id="classification">Bot classification</h2>
          <p>XOXO classifies every request into one of four categories using a combination of user-agent analysis, behavioural fingerprinting, and IP reputation data.</p>
          <ul>
            <li><strong>Training scrapers</strong> — GPTBot, ClaudeBot, CCBot, Common Crawl. Serve cached full HTML.</li>
            <li><strong>Retrieval agents</strong> — PerplexityBot, OAI-SearchBot. Serve cached structured JSON.</li>
            <li><strong>Search crawlers</strong> — Googlebot, Bingbot. Allow through (SEO traffic).</li>
            <li><strong>Disguised bots</strong> — Bots mimicking Chrome/Safari/Firefox. Block by default.</li>
          </ul>

          <div className="xo-docs-sep" />

          <h2 id="cache">Edge cache</h2>
          <p>XOXO maintains a globally distributed edge cache built on Cloudflare&apos;s infrastructure. When a bot hits your site from San Francisco, the nearest Cloudflare PoP intercepts it — your Mumbai origin never wakes up.</p>
          <p>Cache TTL is configurable per domain (default: 1 hour for article content). Purge specific URLs instantly via webhook or the dashboard.</p>

          <div className="xo-docs-sep" />

          <h2 id="llms-txt">llms.txt auto-generation</h2>
          <p>XOXO automatically generates and serves a <code style={{ background: "var(--surface)", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>/llms.txt</code> file at your domain. This machine-readable site guide gives AI agents the structural information they need in a single request — stopping them from crawling 5,000 pages to understand your site.</p>

          <div className="xo-docs-sep" />

          <h2 id="api-classify">API: POST /v1/classify</h2>
          <p>The classification endpoint. Called by your Worker on every request.</p>
          <div className="xo-docs-code">
            POST https://edge.xoxo.ai/v1/classify{"\n\n"}
            Headers:{"\n"}
            {"  "}Authorization: Bearer xo_live_sk_YOUR_KEY{"\n"}
            {"  "}X-URL: https://yourdomain.com/article/123{"\n"}
            {"  "}X-UA: Mozilla/5.0 (compatible; GPTBot/1.0; ...){"\n"}
            {"  "}X-IP: 40.77.167.0{"\n\n"}
            Response:{"\n"}
            {"  "}{"{ \"action\": \"serve_cache\", \"payload\": \"<cached html>\" }"}{"\n"}
            {"  "}{"// or { \"action\": \"block\" }"}{"\n"}
            {"  "}{"// or { \"action\": \"passthrough\" }"}
          </div>

          <h2 id="api-purge">API: POST /v1/purge</h2>
          <p>Purge a specific URL from XOXO&apos;s edge cache. Call this from your CMS webhook when content is updated.</p>
          <div className="xo-docs-code">
            POST https://edge.xoxo.ai/v1/purge{"\n"}
            {"{ \"url\": \"https://yourdomain.com/article/123\" }"}
          </div>

          <h2 id="api-stats">API: GET /v1/stats</h2>
          <p>Retrieve savings statistics for your domain programmatically.</p>
          <div className="xo-docs-code">
            GET https://edge.xoxo.ai/v1/stats?domain=yourdomain.com&period=30d{"\n\n"}
            Response:{"\n"}
            {"  }{"}{"\n"}
            {"    "}saved_usd: 5280,{"\n"}
            {"    "}origin_calls_blocked: 1400000,{"\n"}
            {"    "}bandwidth_saved_gb: 940,{"\n"}
            {"    "}bot_share: 0.51{"\n"}
            {"  }{"}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
