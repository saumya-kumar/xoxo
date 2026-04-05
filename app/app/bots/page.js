import MetricCard, { MetricGrid } from "../../../components/dashboard/metric-card";
import { Card, CardHeader, CardBody } from "../../../components/ui/card";
import Badge from "../../../components/ui/badge";

export const metadata = { title: "Bot Intelligence" };

const css = `
.xo-bot-r { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--ink-06); }
.xo-bot-r:last-child { border-bottom: none; }
.xo-bot-ic { width: 30px; height: 30px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
.xo-bot-n { font-size: 13px; font-weight: 500; color: var(--ink); }
.xo-bot-s { font-size: 11px; color: var(--ink-30); }
.xo-pb-bar { height: 3px; background: var(--ink-06); border-radius: 100px; margin-top: 5px; overflow: hidden; }
.xo-pb-fill { height: 100%; border-radius: 100px; }
.mb16 { margin-bottom: 16px; }
.mb10 { margin-bottom: 10px; }
`;

const BOTS = [
  { name: "GPTBot",        owner: "OpenAI",       category: "Training",  reqs: "47,820", robots: "Compliant", action: "Cached",  botColor: "amber",   robotsColor: "green",  actionColor: "green",   share: 74 },
  { name: "ClaudeBot",     owner: "Anthropic",    category: "Training",  reqs: "24,401", robots: "Compliant", action: "Cached",  botColor: "amber",   robotsColor: "green",  actionColor: "green",   share: 37 },
  { name: "PerplexityBot", owner: "Perplexity",   category: "Retrieval", reqs: "18,200", robots: "Compliant", action: "Cached",  botColor: "blue",    robotsColor: "green",  actionColor: "green",   share: 28 },
  { name: "CCBot",         owner: "Common Crawl", category: "Training",  reqs: "12,100", robots: "Bypassing", action: "Blocked", botColor: "amber",   robotsColor: "red",    actionColor: "red",     share: 19 },
  { name: "Chrome/120 ⚠",  owner: "Unknown",      category: "Disguised", reqs: "8,400",  robots: "Bypassing", action: "Blocked", botColor: "red",     robotsColor: "red",    actionColor: "red",     share: 13 },
  { name: "Googlebot",     owner: "Google",       category: "Search",    reqs: "9,800",  robots: "Compliant", action: "Allowed", botColor: "blue",    robotsColor: "green",  actionColor: "neutral", share: 15 },
];

const BOT_ICONS = { Training: "🤖", Retrieval: "🔍", Search: "🔍", Disguised: "⚠️" };

export default function BotsPage() {
  return (
    <>
      <style>{css}</style>
      <MetricGrid>
        <MetricCard label="Bots Identified"    value="23"   accent="g" change="↑ 3 new this week"      changeType="up" />
        <MetricCard label="Disguised Bots"     value="13"   unit="%" accent="r" change="Mimicking Chrome"  changeType="down" />
        <MetricCard label="Compliant Bots"     value="20"   accent="b" change="Honouring rules"          changeType="neutral" />
        <MetricCard label="Detection Accuracy" value="99.2" unit="%" accent="a" change="↑ 0.3% this month" changeType="up" />
      </MetricGrid>

      <Card className="mb10">
        <CardHeader title="All identified bots" action="Export →" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Bot", "Owner", "Category", "Req/day", "Robots.txt", "Action"].map((h) => (
                  <th key={h} style={{ fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-30)", padding: "9px 14px", textAlign: "left", borderBottom: "1px solid var(--ink-06)", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOTS.map(({ name, owner, category, reqs, robots, action, botColor, robotsColor, actionColor }) => (
                <tr key={name}>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><strong>{name}</strong></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12, color: "var(--ink-60)" }}>{owner}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><Badge color={botColor}>{category}</Badge></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}>{reqs}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><Badge color={robotsColor}>{robots}</Badge></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><Badge color={actionColor}>{action}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Bot activity breakdown" />
        <CardBody>
          {BOTS.slice(0, 5).map(({ name, owner, category, share }) => (
            <div key={name} className="xo-bot-r">
              <div className="xo-bot-ic" style={{ background: category === "Disguised" ? "var(--red-lt)" : category === "Training" ? "var(--amber-lt)" : "var(--blue-lt)" }}>
                {BOT_ICONS[category] || "🤖"}
              </div>
              <div style={{ flex: 1 }}>
                <div className="xo-bot-n">{name}</div>
                <div className="xo-bot-s">{owner} · {category}</div>
                <div className="xo-pb-bar">
                  <div className="xo-pb-fill" style={{ width: `${share}%`, background: category === "Disguised" ? "var(--red)" : category === "Training" ? "var(--amber)" : "var(--blue)" }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-60)", width: 40, textAlign: "right" }}>{share}%</div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
