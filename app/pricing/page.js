import Nav from "../../components/nav";
import Footer from "../../components/footer";
import PricingSection from "../../components/sections/pricing-section";
import RevealObserver from "../../components/reveal-observer";

export const metadata = { title: "Pricing" };

const css = `
.xo-pricing-hero { max-width: 640px; margin: 0 auto; padding: 80px 48px 0; text-align: center; }
.xo-pricing-hero h1 { font-size: clamp(28px, 4vw, 48px); font-weight: 300; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 16px; }
.xo-pricing-hero h1 strong { font-weight: 500; color: var(--green); }
.xo-pricing-hero p { font-size: 14px; color: var(--ink-40); line-height: 1.8; }
.xo-compare { max-width: 800px; margin: 0 auto; padding: 80px 48px; }
.xo-compare h2 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 24px; }
.xo-faq { max-width: 640px; margin: 0 auto; padding: 0 48px 80px; }
.xo-faq h2 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 24px; }
.xo-faq-item { border-bottom: 1px solid var(--ink-06); padding: 20px 0; }
.xo-faq-q { font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 8px; }
.xo-faq-a { font-size: 13px; color: var(--ink-60); line-height: 1.75; }
@media (max-width: 640px) {
  .xo-pricing-hero { padding: 60px 20px 0; }
  .xo-compare, .xo-faq { padding-left: 20px; padding-right: 20px; }
}
`;

const FAQ = [
  { q: "Do I need to change my website code?", a: "No. XOXO sits entirely outside your stack. You paste a 50-line JavaScript Worker into your Cloudflare dashboard and add a route. Zero changes to your website code, zero deployment risk." },
  { q: "What if I'm not on Cloudflare?", a: "XOXO works on Fastly, Vercel Edge, AWS CloudFront, and nginx via a config block. Cloudflare is recommended (and the fastest to set up) but not required." },
  { q: "How are savings calculated?", a: "XOXO measures every origin call avoided (CPU cost), every GB of bandwidth not transferred, and every CDN request saved. We apply your actual infrastructure pricing to calculate a dollar figure each month." },
  { q: "What happens if I cancel?", a: "Bot traffic immediately starts hitting your origin again. Your server bill goes back to where it was before XOXO. Most publishers cancel, see their bill spike, and re-subscribe within 30 days." },
  { q: "Is the 14-day trial really free?", a: "Yes. No credit card required to start. You only need a card when you decide to stay." },
  { q: "Can I control which bots are cached vs blocked?", a: "Yes. The Policy dashboard gives you per-bot and per-category controls. Changes take effect at the edge within 30 seconds — no deploys." },
];

export default function PricingPage() {
  return (
    <>
      <style>{css}</style>
      <RevealObserver />
      <Nav />
      <main>
        <div className="xo-pricing-hero fade-1">
          <p className="xo-eyebrow" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)", marginBottom: 16 }}>Pricing</p>
          <h1>Pay a fraction of<br /><strong>what you save.</strong></h1>
          <p>Simple SaaS pricing. No revenue share. No AI company middlemen. Just a monthly fee that&apos;s always a fraction of your monthly savings. A publisher saving $8,000/month pays $499 — a 16× ROI.</p>
        </div>
        <PricingSection showIntro={false} />
        <div className="xo-faq">
          <h2>Frequently asked questions</h2>
          {FAQ.map(({ q, a }) => (
            <div key={q} className="xo-faq-item">
              <div className="xo-faq-q">{q}</div>
              <div className="xo-faq-a">{a}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
