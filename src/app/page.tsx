import Hero from "@/components/landing/Hero";
import PainPoints from "@/components/landing/PainPoints";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Pricing />
      <Security />
      <FAQ />
      <CTA />
    </main>
  );
}
