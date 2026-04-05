import MetricCard, { MetricGrid } from "../../../components/dashboard/metric-card";
import { Card, CardHeader, CardBody } from "../../../components/ui/card";
import BarChart from "../../../components/dashboard/bar-chart";

export const metadata = { title: "Traffic" };

const css = `
.mb10 { margin-bottom: 10px; }
.mb16 { margin-bottom: 16px; }
`;

const WEEKLY_BARS = [
  { pct: 40, color: "var(--green)", opacity: 0.6, label: "W1" },
  { pct: 44, color: "var(--green)", opacity: 0.65, label: "W2" },
  { pct: 48, color: "var(--green)", opacity: 0.7,  label: "W3" },
  { pct: 51, color: "var(--green)", opacity: 1,    label: "W4" },
];

const HOURLY_BARS = Array.from({ length: 24 }, (_, i) => {
  const peak = Math.sin((i - 2) * Math.PI / 12);
  return {
    pct: Math.max(5, Math.round(20 + peak * 75)),
    color: i >= 9 && i <= 18 ? "var(--blue)" : "var(--ink-12)",
    label: i % 6 === 0 ? `${i}h` : undefined,
  };
});

export default function TrafficPage() {
  return (
    <>
      <style>{css}</style>
      <MetricGrid>
        <MetricCard label="Total Requests"       value="12.8" unit="M" accent="b" change="↑ 14% this month"    changeType="up" />
        <MetricCard label="Bot Requests"         value="6.5"  unit="M" accent="g" change="↑ 31% this month"    changeType="up" />
        <MetricCard label="Human Requests"       value="6.3"  unit="M" accent="a" change="↓ 3% this month"     changeType="down" />
        <MetricCard label="Bypassing Robots.txt" value="13"   unit="%" accent="r" change="Rising — watch this" changeType="down" />
      </MetricGrid>

      <Card className="mb10">
        <CardHeader title="Bot vs human traffic — weekly trend" />
        <CardBody>
          <BarChart
            bars={WEEKLY_BARS}
            height={160}
            legend={[
              { color: "var(--green)", label: "Bot traffic" },
              { color: "rgba(37,99,235,0.3)", label: "Human traffic" },
            ]}
          />
        </CardBody>
      </Card>

      <Card className="mb10">
        <CardHeader title="Requests by hour (today)" />
        <CardBody>
          <BarChart
            bars={HOURLY_BARS}
            height={120}
            note="Peak bot traffic: 9am–6pm. Matches LLM training pipeline schedules."
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Requests by category this month" />
        <CardBody>
          {[
            { label: "Training scrapers", pct: 28, color: "var(--green)", count: "3.6M" },
            { label: "Retrieval agents",  pct: 15, color: "var(--red)",   count: "1.9M" },
            { label: "Search crawlers",   pct: 8,  color: "var(--blue)",  count: "1.0M" },
            { label: "Disguised bots",    pct: 5,  color: "var(--amber)", count: "640k" },
            { label: "Human visitors",    pct: 49, color: "var(--ink-12)",count: "6.3M" },
          ].map(({ label, pct, color, count }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "var(--ink)", width: 150, flexShrink: 0 }}>{label}</div>
              <div style={{ flex: 1, height: 6, background: "var(--ink-06)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", width: 40, textAlign: "right" }}>{pct}%</div>
              <div style={{ fontSize: 11, color: "var(--ink-30)", width: 40, textAlign: "right" }}>{count}</div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
