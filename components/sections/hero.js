import Link from "next/link";

const css = `
.xo-hero {
  max-width: 760px; margin: 0 auto;
  padding: 120px 48px 100px; text-align: center;
}
.xo-hero-tag {
  display: inline-block; font-size: 11px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--green);
  margin-bottom: 32px; padding: 5px 14px;
  background: var(--green-lt); border-radius: 100px;
}
.xo-hero-headline {
  font-size: clamp(36px, 6vw, 64px); font-weight: 300;
  line-height: 1.1; letter-spacing: -0.03em;
  color: var(--ink); margin-bottom: 28px;
}
.xo-hero-headline strong { font-weight: 500; }
.xo-hero-headline .accent { color: var(--green); }
.xo-hero-sub {
  font-size: 15px; color: var(--ink-40); max-width: 480px;
  margin: 0 auto 48px; line-height: 1.8; font-weight: 300;
}
.xo-hero-cta {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; flex-wrap: wrap;
}
.xo-btn-primary-lg {
  font-family: var(--font-mono); font-size: 13px;
  padding: 14px 32px; background: var(--ink); color: var(--white);
  border: none; border-radius: 3px; cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s;
  text-decoration: none;
}
.xo-btn-primary-lg:hover { background: var(--green); transform: translateY(-1px); }
.xo-btn-secondary-lg {
  font-family: var(--font-mono); font-size: 13px;
  padding: 14px 32px; background: transparent;
  color: var(--ink-40); border: 1px solid var(--ink-06);
  border-radius: 3px; cursor: pointer; letter-spacing: 0.02em;
  transition: color 0.2s, border-color 0.2s; text-decoration: none;
}
.xo-btn-secondary-lg:hover { color: var(--ink); border-color: rgba(12,12,12,0.2); }
@media (max-width: 640px) {
  .xo-hero { padding: 80px 20px 60px; }
}
`;

export default function Hero() {
  return (
    <>
      <style>{css}</style>
      <div className="xo-hero">
        <div className="xo-hero-tag fade-1">For publishers &amp; content sites</div>
        <h1 className="xo-hero-headline fade-2">
          Your server bill<br />
          is paying for<br />
          <strong className="accent">bots that never pay.</strong>
        </h1>
        <p className="xo-hero-sub fade-3">
          AI agents visit your site thousands of times a day — hitting your origin
          servers, burning compute, and generating zero revenue. XOXO stops that.
          Silently. Automatically.
        </p>
        <div className="xo-hero-cta fade-4">
          <Link href="/signup" className="xo-btn-primary-lg">Cut my server costs</Link>
          <Link href="#how" className="xo-btn-secondary-lg">See how it works</Link>
        </div>
      </div>
    </>
  );
}
