import type { ReactNode } from 'react';
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

function Section({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

export default function Home() {
  return (
    <main className="site-bg">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <Section>
          <Hero />
        </Section>
        <Section>
          <About />
        </Section>
        <Section>
          <div className="band-gold p-8">
            <Services />
          </div>
        </Section>
        <Section>
          <Technology />
        </Section>
        <Section>
          <CallForQuote />
        </Section>
        <Section>
          <Testimonials />
        </Section>
        <Section>
          <CallForQuote />
        </Section>
        <Section>
          <Promotions />
        </Section>
        <Section>
          <div className="band-gold p-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em]">Buy now, pay later</p>
              <p className="mt-3 text-sm opacity-80">Flexible payment options for tint, PPF, and glass replacement.</p>
            </div>
          </div>
        </Section>
        <Section>
          <DarknessGrid />
        </Section>
        <Section>
          <IntakeForm />
        </Section>
        <Section>
          <CTA />
        </Section>
      </div>
    </main>
  );
}
