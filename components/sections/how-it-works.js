const css = `
.xo-how-bg { background: var(--mid); }
.xo-how-inner { max-width: 960px; margin: 0 auto; padding: 100px 48px; }
.xo-eyebrow {
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--green); margin-bottom: 20px;
}
.xo-section-title {
  font-size: clamp(26px, 3.5vw, 42px); font-weight: 300;
  letter-spacing: -0.03em; line-height: 1.15;
  color: var(--ink); margin-bottom: 20px;
}
.xo-section-title strong { font-weight: 500; }
.xo-section-body {
  font-size: 14px; color: var(--ink-40); line-height: 1.85; max-width: 520px;
}
.xo-steps {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 2px; margin-top: 56px;
  background: var(--ink-06); border: 1px solid var(--ink-06);
}
.xo-step {
  background: var(--mid); padding: 36px; transition: background 0.2s;
}
.xo-step:hover { background: var(--white); }
.xo-step-n {
  font-size: 11px; color: var(--green); letter-spacing: 0.08em; margin-bottom: 16px;
}
.xo-step-title {
  font-size: 16px; font-weight: 500; color: var(--ink);
  margin-bottom: 10px; letter-spacing: -0.02em;
}
.xo-step-desc { font-size: 13px; color: var(--ink-40); line-height: 1.75; }
@media (max-width: 640px) {
  .xo-how-inner { padding: 60px 20px; }
  .xo-steps { grid-template-columns: 1fr; }
}
`;

const STEPS = [
  {
    n: "01",
    title: "Every request is classified",
    desc: "XOXO identifies whether each visitor is a human, a retrieval agent, or a training scraper — using behavioural signals, not just user-agent strings.",
  },
  {
    n: "02",
    title: "Bots get a cached response",
    desc: "AI agents get a lightweight structured response served from edge cache. Your origin server is never touched. No CPU. No bandwidth. No bill.",
  },
  {
    n: "03",
    title: "An llms.txt is auto-generated",
    desc: "A single machine-readable file gives agents what they need in one pass — stopping them from crawling 5,000 pages to find it themselves.",
  },
  {
    n: "04",
    title: "You see exactly what you saved",
    desc: "A live dashboard shows origin calls avoided, bandwidth saved, and the exact dollar amount XOXO saved you this month. Every month.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <style>{css}</style>
      <div className="xo-how-bg">
        <div className="xo-how-inner reveal" id="how">
          <div className="xo-eyebrow">How it works</div>
          <h2 className="xo-section-title">
            One script tag.<br /><strong>Instant savings.</strong>
          </h2>
          <p className="xo-section-body">
            XOXO sits at the edge of your infrastructure. It classifies every
            request, routes bots to lightweight cached responses, and your origin
            server never has to do the work.
          </p>
          <div className="xo-steps">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="xo-step">
                <div className="xo-step-n">{n}</div>
                <div className="xo-step-title">{title}</div>
                <div className="xo-step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
