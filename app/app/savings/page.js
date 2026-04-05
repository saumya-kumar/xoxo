import MetricCard, { MetricGrid } from "../../../components/dashboard/metric-card";
import { Card, CardHeader, CardBody } from "../../../components/ui/card";
import BarChart from "../../../components/dashboard/bar-chart";

export const metadata = { title: "Savings" };

const css = `
.xo-sav-hero {
  background: var(--ink); border-radius: 6px; padding: 28px;
  margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}
.xo-sav-big { font-size: 48px; font-weight: 500; color: var(--green); letter-spacing: -0.05em; line-height: 1; }
.xo-sav-big-l { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 4px; letter-spacing: 0.06em; text-transform: uppercase; }
.xo-sav-bdown { display: flex; gap: 32px; }
.xo-sbd { text-align: right; }
.xo-sbd-n { font-size: 18px; font-weight: 500; color: #fff; letter-spacing: -0.02em; }
.xo-sbd-l { font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 3px; }
.xo-src-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--ink-06); }
.xo-src-row:last-child { border-bottom: none; }
.xo-src-n { font-size: 13px; font-weight: 500; color: var(--ink); }
.xo-src-s { font-size: 11px; color: var(--ink-30); margin-top: 2px; }
.xo-src-bar { height: 3px; background: var(--ink-06); border-radius: 100px; margin-top: 6px; overflow: hidden; }
.xo-src-fill { height: 100%; border-radius: 100px; }
.xo-src-amt { font-size: 14px; font-weight: 500; margin-left: auto; flex-shrink: 0; }
.mb12 { margin-bottom: 12px; }
.mb16 { margin-bottom: 16px; }
`;

const CUMULATIVE_BARS = Array.from({ length: 12 }, (_, i) => ({
  pct: Math.round(8 + Math.pow((i + 1) / 12, 0.7) * 92),
  color: "var(--green)",
  opacity: 0.4 + (i / 11) * 0.6,
  label: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i],
}));

export default function SavingsPage() {
  return (
    <>
      <style>{css}</style>

      {/* Hero savings number */}
      <div className="xo-sav-hero">
        <div>
          <div className="xo-sav-big">$5,280</div>
          <div className="xo-sav-big-l">Saved this month</div>
        </div>
        <div className="xo-sav-bdown">
          <div className="xo-sbd"><div className="xo-sbd-n">$63,360</div><div className="xo-sbd-l">projected annual</div></div>
          <div className="xo-sbd"><div className="xo-sbd-n">10.6×</div><div className="xo-sbd-l">ROI vs plan cost</div></div>
          <div className="xo-sbd"><div className="xo-sbd-n">↑ daily</div><div className="xo-sbd-l">cache warming</div></div>
        </div>
      </div>

      <MetricGrid>
        <MetricCard label="Compute Saved"    value="$3,180" accent="g" change="Origin calls blocked"    changeType="up" />
        <MetricCard label="Bandwidth Saved"  value="$1,400" accent="b" change="940GB not transferred"   changeType="up" />
        <MetricCard label="CDN Cost Saved"   value="$700"   accent="a" change="Edge cache hits"          changeType="up" />
        <MetricCard label="Plan Cost"        value="$499"   accent="r" change="Publisher plan"           changeType="neutral" />
      </MetricGrid>

      <Card className="mb12">
        <CardHeader title="Savings breakdown by source" />
        <CardBody>
          <div className="xo-src-row">
            <div style={{ flex: 1 }}>
              <div className="xo-src-n">Origin compute blocked</div>
              <div className="xo-src-s">1.4M server calls avoided this month</div>
              <div className="xo-src-bar"><div className="xo-src-fill" style={{ width: "60%", background: "var(--green)" }} /></div>
            </div>
            <div className="xo-src-amt" style={{ color: "var(--green)" }}>$3,180</div>
          </div>
          <div className="xo-src-row">
            <div style={{ flex: 1 }}>
              <div className="xo-src-n">Bandwidth not transferred</div>
              <div className="xo-src-s">940GB intercepted at XOXO edge</div>
              <div className="xo-src-bar"><div className="xo-src-fill" style={{ width: "26%", background: "var(--blue)" }} /></div>
            </div>
            <div className="xo-src-amt" style={{ color: "var(--blue)" }}>$1,400</div>
          </div>
          <div className="xo-src-row">
            <div style={{ flex: 1 }}>
              <div className="xo-src-n">CDN efficiency</div>
              <div className="xo-src-s">Edge cache hits replacing origin fetches</div>
              <div className="xo-src-bar"><div className="xo-src-fill" style={{ width: "14%", background: "var(--amber)" }} /></div>
            </div>
            <div className="xo-src-amt" style={{ color: "var(--amber)" }}>$700</div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Cumulative savings (12-month projection)" />
        <CardBody>
          <BarChart
            bars={CUMULATIVE_BARS}
            height={140}
            note="Projection based on current bot traffic growth rate of +18%/month"
          />
        </CardBody>
      </Card>
    </>
  );
}
