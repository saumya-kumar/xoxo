import Nav from "../components/nav";
import Footer from "../components/footer";
import Hero from "../components/sections/hero";
import StatBar from "../components/sections/stat-bar";
import HowItWorks from "../components/sections/how-it-works";
import SavingsCalculator from "../components/sections/savings-calculator";
import PricingSection from "../components/sections/pricing-section";
import CTAStrip from "../components/sections/cta-strip";
import RevealObserver from "../components/reveal-observer";

export const metadata = {
  title: "XOXO — Stop paying for bots",
  description:
    "XOXO cuts your server bill 30–60% by intercepting AI bot traffic at the edge. One script tag. Instant savings.",
};

export default function HomePage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <StatBar />
        <HowItWorks />
        <SavingsCalculator />
        <PricingSection />
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
}
