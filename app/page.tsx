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

export default function Home() {
  return (
    <main className="site-bg">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <LocationTitle />
        <Hero />
        <About />
        <div className="band-gold p-8">
          <Services />
        </div>
        <Technology />
        <CallForQuote />
        <Testimonials />
        <CallForQuote />
        <Promotions />
        <div className="band-gold p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em]">Buy now, pay later</p>
            <p className="mt-3 text-sm opacity-80">
              Flexible payment options for tint, PPF, and glass replacement.
            </p>
          </div>
        </div>
        <DarknessGrid />
        <IntakeForm />
        <CTA />
      </div>
    </main>
  );
}
