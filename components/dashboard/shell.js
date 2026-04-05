"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const css = `
.xo-dash-wrap { display: flex; height: 100vh; overflow: hidden; }

/* Sidebar */
.xo-ds {
  width: 216px; background: var(--ink); display: flex; flex-direction: column;
  flex-shrink: 0; overflow-y: auto;
}
.xo-ds-logo { padding: 18px 18px 0; font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.02em; }
.xo-ds-logo em { color: var(--green); font-style: normal; }
.xo-ds-site {
  margin: 14px 10px 18px; padding: 9px 12px;
  background: rgba(255,255,255,0.06); border-radius: 6px;
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.08); transition: background 0.15s;
}
.xo-ds-site:hover { background: rgba(255,255,255,0.1); }
.xo-ds-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
.xo-ds-name { font-size: 12px; color: rgba(255,255,255,0.65); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.xo-ds-sec { padding: 0 10px 5px; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.2); }
.xo-nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 8px 10px; margin: 1px 6px; border-radius: 5px;
  cursor: pointer; color: rgba(255,255,255,0.4); font-size: 12px;
  transition: background 0.15s; text-decoration: none;
}
.xo-nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); }
.xo-nav-item.active { background: rgba(255,255,255,0.1); color: #fff; }
.xo-nav-item.active .xo-ni { color: var(--green); }
.xo-ni { width: 15px; text-align: center; font-size: 13px; flex-shrink: 0; }
.xo-nb { margin-left: auto; background: var(--green); color: var(--ink); font-size: 9px; font-weight: 600; padding: 1px 5px; border-radius: 100px; }
.xo-ds-bottom { margin-top: auto; padding: 10px; border-top: 1px solid rgba(255,255,255,0.06); }
.xo-user-row { display: flex; align-items: center; gap: 9px; padding: 7px 8px; border-radius: 5px; cursor: pointer; }
.xo-user-row:hover { background: rgba(255,255,255,0.07); }
.xo-ua { width: 26px; height: 26px; border-radius: 50%; background: var(--green); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: var(--ink); flex-shrink: 0; }
.xo-un { font-size: 11px; color: rgba(255,255,255,0.55); }
.xo-up { font-size: 10px; color: rgba(255,255,255,0.2); }

/* Main */
.xo-dash-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.xo-dash-header {
  height: 52px; background: var(--white); border-bottom: 1px solid var(--ink-12);
  display: flex; align-items: center; padding: 0 24px; gap: 12px; flex-shrink: 0;
}
.xo-dh-title { font-size: 13px; font-weight: 500; color: var(--ink); flex: 1; }
.xo-dh-btn {
  font-family: var(--font-mono); font-size: 11px; padding: 5px 12px;
  border-radius: 3px; cursor: pointer; transition: all 0.15s; letter-spacing: 0.02em;
  border: 1px solid var(--ink-12); background: transparent; color: var(--ink-60);
}
.xo-dh-btn:hover { border-color: var(--ink-30); color: var(--ink); }
.xo-dh-btn.p { background: var(--ink); color: #fff; border-color: var(--ink); }
.xo-dh-btn.p:hover { background: var(--green); border-color: var(--green); }
.xo-dh-range { font-size: 11px; color: var(--ink-30); padding: 5px 10px; border: 1px solid var(--ink-12); border-radius: 3px; cursor: pointer; }
.xo-dash-content { flex: 1; overflow-y: auto; padding: 20px 24px; background: var(--surface); }

@media (max-width: 768px) {
  .xo-ds { display: none; }
}
`;

const NAV = [
  { href: "/app",          icon: "◈", label: "Overview",      badge: null },
  { href: "/app/traffic",  icon: "≋", label: "Traffic",       badge: null },
  { href: "/app/savings",  icon: "◎", label: "Savings",       badge: "$"  },
  { href: "/app/bots",     icon: "⊕", label: "Bot Intel",     badge: null },
];
const CONTROL = [
  { href: "/app/policy",   icon: "⊞", label: "Policy",        badge: null },
  { href: "/app/settings", icon: "◯", label: "Settings",      badge: null },
];

const PAGE_TITLES = {
  "/app": "Overview",
  "/app/traffic": "Traffic",
  "/app/savings": "Savings",
  "/app/bots": "Bot Intelligence",
  "/app/policy": "Policy",
  "/app/settings": "Settings",
};

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Dashboard";

  return (
    <>
      <style>{css}</style>
      <div className="xo-dash-wrap">
        {/* Sidebar */}
        <div className="xo-ds">
          <div className="xo-ds-logo">XOXO<em>.</em></div>
          <div className="xo-ds-site">
            <div className="xo-ds-dot" />
            <div className="xo-ds-name">techcrunch.com</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>⌄</div>
          </div>
          <div className="xo-ds-sec">Main</div>
          {NAV.map(({ href, icon, label, badge }) => (
            <Link key={href} href={href} className={`xo-nav-item${pathname === href ? " active" : ""}`}>
              <div className="xo-ni">{icon}</div>
              {label}
              {badge && <div className="xo-nb">{badge}</div>}
            </Link>
          ))}
          <div className="xo-ds-sec" style={{ marginTop: 10 }}>Control</div>
          {CONTROL.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={`xo-nav-item${pathname === href ? " active" : ""}`}>
              <div className="xo-ni">{icon}</div>
              {label}
            </Link>
          ))}
          <div className="xo-ds-bottom">
            <div className="xo-user-row">
              <div className="xo-ua">SP</div>
              <div>
                <div className="xo-un">Satvik M.</div>
                <div className="xo-up">Publisher plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="xo-dash-main">
          <div className="xo-dash-header">
            <div className="xo-dh-title">{title}</div>
            <div className="xo-dh-range">Last 30 days ⌄</div>
            <button className="xo-dh-btn">Export</button>
            <button className="xo-dh-btn p">+ Add site</button>
          </div>
          <div className="xo-dash-content">{children}</div>
        </div>
      </div>
    </>
  );
}
