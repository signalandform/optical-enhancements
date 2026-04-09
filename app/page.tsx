import type { ReactNode } from 'react';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Technology } from './components/sections/Technology';
import { CallForQuote } from './components/sections/CallForQuote';
import { Testimonials } from './components/sections/Testimonials';
import { Promotions } from './components/sections/Promotions';
import { DarknessGrid } from './components/sections/DarknessGrid';
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
          <div className="band-gold p-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em]">Financing available</p>
                <p className="mt-2 text-sm opacity-80">Get tint, wraps, PPF, or glass work now and pay over time.</p>
              </div>
              <a
                href="/book-now"
                className="inline-flex rounded-full border border-black/20 bg-black/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-black"
              >
                Ask about financing
              </a>
            </div>
          </div>
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
          <DarknessGrid />
        </Section>
        <Section>
          <CTA />
        </Section>
      </div>
    </main>
  );
}
