"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "../../../components/ui/card";
import { InlineInput } from "../../../components/ui/input";
import Toggle from "../../../components/ui/toggle";
import Badge from "../../../components/ui/badge";

const css = `
.xo-g2-s { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.xo-set-row {
  display: flex; align-items: center; padding: 14px 18px;
  border-bottom: 1px solid var(--ink-06); gap: 14px;
}
.xo-set-row:last-child { border-bottom: none; }
.xo-set-l { font-size: 13px; font-weight: 500; color: var(--ink); flex: 1; }
.xo-set-d { font-size: 11px; color: var(--ink-30); margin-top: 2px; }
.xo-usage-bar { min-width: 160px; }
.xo-dh-btn {
  font-family: var(--font-mono); font-size: 11px; padding: 5px 12px;
  border-radius: 3px; cursor: pointer; transition: all 0.15s; letter-spacing: 0.02em;
  border: 1px solid var(--ink-12); background: transparent; color: var(--ink-60);
}
.xo-dh-btn:hover { border-color: var(--ink-30); color: var(--ink); }
.xo-dh-btn.p { background: var(--ink); color: #fff; border-color: var(--ink); }
.xo-dh-btn.p:hover { background: var(--green); border-color: var(--green); }
.xo-api-key { font-family: var(--font-mono); font-size: 11px; padding: 6px 12px; border: 1px solid var(--ink-12); border-radius: 4px; background: var(--surface); color: var(--ink); min-width: 260px; cursor: text; }
@media (max-width: 900px) { .xo-g2-s { grid-template-columns: 1fr; } }
`;

export default function SettingsClient() {
  const [ttl, setTtl] = useState("3600");
  const [apiVisible, setApiVisible] = useState(false);

  return (
    <>
      <style>{css}</style>

      <div className="xo-g2-s">
        <Card>
          <CardHeader title="Site configuration" />
          <div className="xo-set-row">
            <div><div className="xo-set-l">Domain</div><div className="xo-set-d">Your active domain</div></div>
            <InlineInput value="techcrunch.com" readOnly />
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">Cache TTL</div><div className="xo-set-d">How long bot responses are cached</div></div>
            <InlineInput value={ttl} onChange={(e) => setTtl(e.target.value)} style={{ minWidth: 160 }} />
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">llms.txt path</div><div className="xo-set-d">Auto-generated file location</div></div>
            <InlineInput value="/llms.txt" readOnly />
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">DNS proxy active</div><div className="xo-set-d">Cloudflare orange cloud on</div></div>
            <Toggle defaultChecked={true} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Plan &amp; billing" />
          <div className="xo-set-row">
            <div><div className="xo-set-l">Current plan</div><div className="xo-set-d">Up to 50M monthly visits</div></div>
            <Badge color="green">Publisher · $499/mo</Badge>
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">Visits this month</div><div className="xo-set-d">12.8M of 50M used</div></div>
            <div className="xo-usage-bar">
              <div style={{ height: 5, background: "var(--ink-06)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ width: "26%", height: "100%", background: "var(--green)", borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: 10, color: "var(--ink-30)", marginTop: 4 }}>26% of limit</div>
            </div>
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">Next billing</div></div>
            <span style={{ fontSize: 12, color: "var(--ink-60)" }}>Nov 1, 2026</span>
          </div>
          <div className="xo-set-row">
            <div><div className="xo-set-l">Upgrade</div><div className="xo-set-d">Unlock unlimited visits</div></div>
            <button className="xo-dh-btn p">Enterprise →</button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Integrations" />
        <div className="xo-set-row">
          <div><div className="xo-set-l">Cloudflare</div><div className="xo-set-d">Worker deployed · Active</div></div>
          <Badge color="green">Connected</Badge>
        </div>
        <div className="xo-set-row">
          <div><div className="xo-set-l">Google Analytics</div><div className="xo-set-d">Human + bot unified view</div></div>
          <Badge color="green">Connected</Badge>
        </div>
        <div className="xo-set-row">
          <div><div className="xo-set-l">Slack</div><div className="xo-set-d">Get savings alerts in workspace</div></div>
          <button className="xo-dh-btn">Connect</button>
        </div>
        <div className="xo-set-row">
          <div><div className="xo-set-l">Webhook</div><div className="xo-set-d">Push events to your endpoint</div></div>
          <button className="xo-dh-btn">Configure</button>
        </div>
        <div className="xo-set-row">
          <div>
            <div className="xo-set-l">API key</div>
            <div className="xo-set-d">For programmatic access</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              className="xo-api-key"
              value={apiVisible ? "xo_live_sk_tc_a8f3c92d1e4b" : "xo_live_sk_tc_••••••••••••"}
              readOnly
            />
            <button className="xo-dh-btn" onClick={() => setApiVisible(!apiVisible)}>
              {apiVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
