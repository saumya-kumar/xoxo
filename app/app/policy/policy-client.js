"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "../../../components/ui/card";
import Toggle from "../../../components/ui/toggle";
import Badge from "../../../components/ui/badge";

const css = `
.xo-pol-notice {
  background: var(--green-lt); border: 1px solid var(--green-bd);
  border-radius: 4px; padding: 10px 14px; font-size: 12px; color: var(--green-dk);
  margin-bottom: 16px; display: flex; gap: 8px;
}
.xo-g2-pol { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.xo-set-row {
  display: flex; align-items: center; padding: 14px 18px;
  border-bottom: 1px solid var(--ink-06); gap: 14px;
}
.xo-set-row:last-child { border-bottom: none; }
.xo-set-l { font-size: 13px; font-weight: 500; color: var(--ink); flex: 1; }
.xo-set-d { font-size: 11px; color: var(--ink-30); margin-top: 2px; }
.xo-pol-row {
  display: flex; align-items: center; gap: 14px; padding: 12px 18px;
  border-bottom: 1px solid var(--ink-06); transition: background 0.15s;
}
.xo-pol-row:last-child { border-bottom: none; }
.xo-pol-row:hover { background: var(--ink-03); }
.xo-pol-name { font-size: 13px; font-weight: 500; color: var(--ink); }
.xo-pol-sub { font-size: 11px; color: var(--ink-30); }
.xo-pol-btns { display: flex; gap: 5px; margin-left: auto; flex-shrink: 0; }
.xo-pb {
  font-family: var(--font-mono); font-size: 10px; padding: 4px 10px;
  border-radius: 3px; cursor: pointer; border: 1px solid var(--ink-12);
  background: transparent; color: var(--ink-60); transition: all 0.15s;
}
.xo-pb:hover { border-color: var(--ink-30); color: var(--ink); }
.xo-pb.pa { background: var(--green-lt); border-color: var(--green-bd); color: var(--green-dk); }
.xo-pb.pr { background: var(--red-lt); border-color: rgba(232,64,64,0.25); color: #9b1212; }
.xo-pb.pl { background: var(--amber-lt); border-color: rgba(245,158,11,0.25); color: #92400e; }
@media (max-width: 900px) { .xo-g2-pol { grid-template-columns: 1fr; } }
`;

const DEFAULT_RULES = [
  { label: "Training scrapers", sub: "GPTBot, CCBot, ClaudeBot",       defaultAction: "Cache" },
  { label: "Retrieval agents",  sub: "PerplexityBot, OAI-SearchBot",   defaultAction: "Cache" },
  { label: "Search crawlers",   sub: "Googlebot, Bingbot",             defaultAction: "Allow" },
  { label: "Unknown / disguised",sub: "Unverified behaviour",          defaultAction: "Block" },
];

const OVERRIDES = [
  { icon: "🤖", name: "GPTBot",   owner: "OpenAI · Training",                      reqs: "47k req/day", reqColor: "green",   defaultAction: "Cache" },
  { icon: "🤖", name: "CCBot",    owner: "Common Crawl · Bypasses robots.txt",      reqs: "12k req/day", reqColor: "red",     defaultAction: "Block" },
  { icon: "🔍", name: "Googlebot",owner: "Google · Search crawler",                reqs: "9.8k req/day",reqColor: "neutral", defaultAction: "Allow" },
];

function PolicyButtons({ actions = ["Cache", "Block", "Rate limit"], defaultAction }) {
  const [active, setActive] = useState(defaultAction);
  const getClass = (a) => {
    if (a !== active) return "xo-pb";
    if (a === "Block") return "xo-pb pr";
    if (a === "Rate limit") return "xo-pb pl";
    return "xo-pb pa";
  };
  return (
    <div className="xo-pol-btns">
      {actions.map((a) => (
        <button key={a} className={getClass(a)} onClick={() => setActive(a)}>{a}</button>
      ))}
    </div>
  );
}

export default function PolicyClient() {
  return (
    <>
      <style>{css}</style>
      <div className="xo-pol-notice">
        <div>✓</div>
        <div>Changes take effect at the edge within <strong>30 seconds</strong>. No deploys needed.</div>
      </div>

      <div className="xo-g2-pol">
        <Card>
          <CardHeader title="Global toggles" />
          {[
            { label: "Bot interception",       desc: "Intercept all non-human traffic",    on: true },
            { label: "Edge caching for bots",  desc: "Serve cached instead of origin",     on: true },
            { label: "llms.txt serving",       desc: "Auto-serve structured site guide",   on: true },
            { label: "Disguised bot detection",desc: "Block bots mimicking browsers",      on: true },
          ].map(({ label, desc, on }) => (
            <div key={label} className="xo-set-row">
              <div>
                <div className="xo-set-l">{label}</div>
                <div className="xo-set-d">{desc}</div>
              </div>
              <Toggle defaultChecked={on} />
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="Default rules by category" />
          {DEFAULT_RULES.map(({ label, sub, defaultAction }) => (
            <div key={label} className="xo-set-row">
              <div>
                <div className="xo-set-l">{label}</div>
                <div className="xo-set-d">{sub}</div>
              </div>
              <PolicyButtons actions={["Cache", "Block", "Allow"]} defaultAction={defaultAction} />
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <CardHeader title="Per-bot overrides" action="+ Add override" />
        {OVERRIDES.map(({ icon, name, owner, reqs, reqColor, defaultAction }) => (
          <div key={name} className="xo-pol-row">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: 5, background: defaultAction === "Block" ? "var(--red-lt)" : defaultAction === "Allow" ? "var(--blue-lt)" : "var(--amber-lt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <div className="xo-pol-name">{name}</div>
                <div className="xo-pol-sub">{owner}</div>
              </div>
            </div>
            <Badge color={reqColor}>{reqs}</Badge>
            <PolicyButtons actions={["Cache", "Block", "Rate limit"]} defaultAction={defaultAction} />
          </div>
        ))}
      </Card>
    </>
  );
}
