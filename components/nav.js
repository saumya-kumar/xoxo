import Link from "next/link";

const css = `
.xo-nav {
  padding: 0 48px; height: 64px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--ink-06);
  position: sticky; top: 0; z-index: 100;
  background: var(--white);
}
.xo-nav-logo {
  font-size: 16px; font-weight: 500; letter-spacing: -0.02em;
  color: var(--ink);
}
.xo-nav-logo em { color: var(--green); font-style: normal; }
.xo-nav-right { display: flex; align-items: center; gap: 32px; }
.xo-nav-link {
  font-size: 12px; color: var(--ink-40); letter-spacing: 0.04em;
  transition: color 0.2s; text-decoration: none;
}
.xo-nav-link:hover { color: var(--ink); }
.xo-nav-btn {
  font-family: var(--font-mono); font-size: 12px;
  padding: 9px 20px; background: var(--ink); color: var(--white);
  border: none; border-radius: 3px; cursor: pointer;
  letter-spacing: 0.02em; transition: background 0.2s;
  text-decoration: none;
}
.xo-nav-btn:hover { background: var(--green); }
@media (max-width: 640px) {
  .xo-nav { padding: 0 20px; }
  .xo-nav-links { display: none; }
}
`;

export default function Nav() {
  return (
    <>
      <style>{css}</style>
      <nav className="xo-nav">
        <Link href="/" className="xo-nav-logo">XOXO<em>.</em></Link>
        <div className="xo-nav-right xo-nav-links">
          <Link href="/#how" className="xo-nav-link">How it works</Link>
          <Link href="/pricing" className="xo-nav-link">Pricing</Link>
          <Link href="/docs" className="xo-nav-link">Docs</Link>
          <Link href="/login" className="xo-nav-link">Sign in</Link>
          <Link href="/signup" className="xo-nav-btn">Get early access</Link>
        </div>
      </nav>
    </>
  );
}
