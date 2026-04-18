import type { ReactNode } from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Technology } from '@/components/sections/Technology';
import { CallForQuote } from '@/components/sections/CallForQuote';
import { Testimonials } from '@/components/sections/Testimonials';
import { Promotions } from '@/components/sections/Promotions';
import { DarknessGrid } from '@/components/sections/DarknessGrid';
import { CTA } from '@/components/sections/CTA';

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
          <div className="band-gold card-sheen relative overflow-hidden p-8 md:p-10 shadow-[0_25px_70px_rgba(212,175,55,0.35)] ring-1 ring-black/10">
            <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="flex items-center gap-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-black/20 bg-black/15 text-2xl font-extrabold text-black shadow-inner">
                  $
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-black/70">
                    0% Options Available
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-bold leading-tight text-black sm:text-4xl">
                    Financing Available
                  </h3>
                  <p className="mt-2 text-sm font-medium text-black/75">
                    Get tint, wraps, PPF, or glass work now—pay over time with fast pre-approval.
                  </p>
                </div>
              </div>
              <a
                href="/book-now"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-gold shadow-lg transition-transform hover:scale-[1.03] hover:bg-night"
              >
                Ask about financing
                <span aria-hidden>→</span>
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
