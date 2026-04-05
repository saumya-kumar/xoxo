import MetricCard, { MetricGrid } from "../../components/dashboard/metric-card";
import { Card, CardHeader, CardBody } from "../../components/ui/card";
import BarChart from "../../components/dashboard/bar-chart";
import Badge from "../../components/ui/badge";

export const metadata = { title: "Overview" };

const css = `
.xo-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.xo-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.mb10 { margin-bottom: 10px; }
.mb16 { margin-bottom: 16px; }
.xo-donut-wrap { display: flex; align-items: center; gap: 20px; }
.xo-donut-legend { display: flex; flex-direction: column; gap: 9px; }
.xo-donut-li { display: flex; align-items: center; gap: 7px; }
.xo-donut-dot { width: 8px; height: 8px; border-radius: 50%; }
.xo-donut-lbl { font-size: 12px; color: var(--ink-60); flex: 1; }
.xo-donut-val { font-size: 12px; font-weight: 500; }
.xo-bot-amount { color: var(--green); font-weight: 500; }
@media (max-width: 900px) { .xo-g2 { grid-template-columns: 1fr; } }
`;

const BOT_ROWS = [
  { name: "GPTBot",        owner: "OpenAI",        type: "Training",  reqs: "47,820", saved: "$32", status: "Cached",  statusColor: "green", typeColor: "amber" },
  { name: "ClaudeBot",     owner: "Anthropic",     type: "Training",  reqs: "24,401", saved: "$17", status: "Cached",  statusColor: "green", typeColor: "amber" },
  { name: "PerplexityBot", owner: "Perplexity",    type: "Retrieval", reqs: "18,200", saved: "$12", status: "Cached",  statusColor: "green", typeColor: "blue"  },
  { name: "CCBot",         owner: "Common Crawl",  type: "Training",  reqs: "12,100", saved: "$8",  status: "Blocked", statusColor: "red",   typeColor: "amber" },
  { name: "Googlebot",     owner: "Google",        type: "Search",    reqs: "9,800",  saved: "—",   status: "Allowed", statusColor: "neutral",typeColor: "blue" },
];

const BAR_DATA = Array.from({ length: 15 }, (_, i) => ({
  pct: Math.round(8 + (i / 14) * 92),
  opacity: 0.3 + (i / 14) * 0.7,
  label: [1, 5, 10, 15, 20, 25, 29][Math.floor(i / 2.2)] || undefined,
}));

export default function OverviewPage() {
  return (
    <>
      <style>{css}</style>
      <MetricGrid>
        <MetricCard label="Saved This Month"    value="$5,280" accent="g" change="↑ first month — growing"  changeType="up" />
        <MetricCard label="Origin Calls Blocked" value="1.4"  unit="M"  accent="b" change="↑ 41% this week"     changeType="up" />
        <MetricCard label="Bot Traffic Share"   value="51"    unit="%"  accent="a" change="Growing month on month" changeType="neutral" />
        <MetricCard label="Bandwidth Saved"     value="940"   unit="GB" accent="r" change="↑ This week alone"     changeType="up" />
      </MetricGrid>

      <div className="xo-g2 mb16">
        <Card>
          <CardHeader title="Daily savings (first 30 days)" action="Expand →" />
          <CardBody>
            <BarChart
              bars={BAR_DATA}
              height={150}
              note="Savings grow as XOXO's cache warms up — more URLs cached = more savings per day"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Traffic split" />
          <CardBody>
            <div className="xo-donut-wrap">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="44" fill="none" stroke="#f4f4f0" strokeWidth="16"/>
                <circle cx="55" cy="55" r="44" fill="none" stroke="var(--green)" strokeWidth="16"
                  strokeDasharray="140 137" strokeDashoffset="0" transform="rotate(-90 55 55)" strokeLinecap="round"/>
                <circle cx="55" cy="55" r="44" fill="none" stroke="var(--red)" strokeWidth="16"
                  strokeDasharray="62 215" strokeDashoffset="-140" transform="rotate(-90 55 55)"/>
                <circle cx="55" cy="55" r="44" fill="none" stroke="var(--blue)" strokeWidth="16"
                  strokeDasharray="49 228" strokeDashoffset="-202" transform="rotate(-90 55 55)"/>
                <text x="55" y="51" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--ink)" fontFamily="Geist Mono">51%</text>
                <text x="55" y="65" textAnchor="middle" fontSize="8" fill="#888" fontFamily="Geist Mono">bots</text>
              </svg>
              <div className="xo-donut-legend">
                {[
                  { color: "var(--green)", label: "Training bots",     val: "28%" },
                  { color: "var(--red)",   label: "Retrieval agents",  val: "15%" },
                  { color: "var(--blue)",  label: "Search crawlers",   val: "8%"  },
                  { color: "var(--ink-12)",label: "Humans",            val: "49%" },
                ].map(({ color, label, val }) => (
                  <div key={label} className="xo-donut-li">
                    <div className="xo-donut-dot" style={{ background: color }} />
                    <div className="xo-donut-lbl">{label}</div>
                    <div className="xo-donut-val">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mb10">
        <CardHeader title="Top bots intercepted today" action="View all →" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Bot", "Owner", "Type", "Requests today", "Saved", "Status"].map((h) => (
                  <th key={h} style={{ fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-30)", padding: "9px 14px", textAlign: "left", borderBottom: "1px solid var(--ink-06)", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOT_ROWS.map(({ name, owner, type, reqs, saved, status, statusColor, typeColor }) => (
                <tr key={name} style={{ cursor: "default" }}>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><strong>{name}</strong></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12, color: "var(--ink-60)" }}>{owner}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><Badge color={typeColor}>{type}</Badge></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}>{reqs}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }} className={saved !== "—" ? "xo-bot-amount" : ""}>{saved}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--ink-06)", fontSize: 12 }}><Badge color={statusColor}>{status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
