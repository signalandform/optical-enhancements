import type { ReactNode } from 'react';
import { LocationTitle } from './components/sections/LocationTitle';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Technology } from './components/sections/Technology';
import { CallForQuote } from './components/sections/CallForQuote';
import { Testimonials } from './components/sections/Testimonials';
import { Promotions } from './components/sections/Promotions';
import { DarknessGrid } from './components/sections/DarknessGrid';
import { IntakeForm } from './components/sections/IntakeForm';
import { CTA } from './components/sections/CTA';

function Section({
  n,
  children,
}: {
  n: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-3 -top-3 z-10 grid h-10 w-10 place-items-center rounded-xl border border-black/30 bg-gradient-to-r from-gold to-gold-dark text-[0.7rem] font-extrabold text-night shadow-[0_12px_40px_rgba(212,175,55,0.12)]">
        {n}
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-bg">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <Section n="01">
          <LocationTitle />
        </Section>
        <Section n="02">
          <Hero />
        </Section>
        <Section n="03">
          <About />
        </Section>
        <Section n="04">
          <div className="band-gold p-8">
            <Services />
          </div>
        </Section>
        <Section n="05">
          <Technology />
        </Section>
        <Section n="06">
          <CallForQuote />
        </Section>
        <Section n="07">
          <Testimonials />
        </Section>
        <Section n="08">
          <CallForQuote />
        </Section>
        <Section n="09">
          <Promotions />
        </Section>
        <Section n="10">
          <div className="band-gold p-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em]">Buy now, pay later</p>
              <p className="mt-3 text-sm opacity-80">
                Flexible payment options for tint, PPF, and glass replacement.
              </p>
            </div>
          </div>
        </Section>
        <Section n="11">
          <DarknessGrid />
        </Section>
        <Section n="12">
          <IntakeForm />
        </Section>
        <Section n="13">
          <CTA />
        </Section>
      </div>
    </main>
  );
}
