import Link from "next/link";

const css = `
.xo-footer {
  padding: 28px 48px;
  border-top: 1px solid var(--ink-06);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px;
}
.xo-footer-logo { font-size: 14px; font-weight: 500; color: var(--ink); letter-spacing: -0.02em; }
.xo-footer-logo em { color: var(--green); font-style: normal; }
.xo-footer-links { display: flex; gap: 24px; }
.xo-footer-link { font-size: 11px; color: var(--ink-40); transition: color 0.2s; }
.xo-footer-link:hover { color: var(--ink); }
.xo-footer-copy { font-size: 11px; color: var(--ink-40); }
@media (max-width: 640px) {
  .xo-footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
}
`;

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="xo-footer">
        <Link href="/" className="xo-footer-logo">XOXO<em>.</em></Link>
        <div className="xo-footer-links">
          <Link href="/docs" className="xo-footer-link">Docs</Link>
          <Link href="/pricing" className="xo-footer-link">Pricing</Link>
          <Link href="/signup" className="xo-footer-link">Sign up</Link>
          <Link href="/login" className="xo-footer-link">Sign in</Link>
        </div>
        <span className="xo-footer-copy">© 2026 XOXO. All rights reserved.</span>
      </footer>
    </>
  );
}
