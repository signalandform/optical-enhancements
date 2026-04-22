import Link from 'next/link';
import { DarknessGrid } from '@/components/sections/DarknessGrid';

export default function WindowTintPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-8">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Automotive Window Tint</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Privacy, Heat Rejection &amp; Style
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              Window tint does more than look good — it blocks up to 98% of infrared heat
              and harmful UV rays, protects your interior from fading, and gives you and your
              passengers real privacy. Whether you drive a sedan, truck, or SUV, we install
              premium ceramic tint film with a lifetime warranty on every package.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book-now"
                className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
              >
                Book your tint
              </Link>
              <a
                href="#visualizer"
                className="inline-flex rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-white"
              >
                Try the visualizer
              </a>
            </div>
          </div>

          <DarknessGrid />

          <div className="panel p-8 md:p-10">
            <p className="section-label">Why tint your windows?</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              Benefits Beyond the Look
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Heat Rejection',
                  body: 'Ceramic film rejects up to 98% of infrared heat, keeping your cabin dramatically cooler in the Texas sun and reducing A/C load.',
                },
                {
                  title: 'UV Protection',
                  body: 'Blocks 99% of harmful UV rays that cause skin damage and fade leather, vinyl, and dashboard surfaces over time.',
                },
                {
                  title: 'Glare Reduction',
                  body: 'Reduces sun glare and headlight glare for a safer, more comfortable driving experience day and night.',
                },
                {
                  title: 'Interior Preservation',
                  body: 'Prevents cracking, warping, and discoloration of interior materials by shielding them from constant sun exposure.',
                },
                {
                  title: 'Privacy & Security',
                  body: 'Darker tint makes it harder for passersby to see your passengers and personal belongings inside the vehicle.',
                },
                {
                  title: 'Shatter Resistance',
                  body: 'In the event of an impact, window film helps hold broken glass together, adding an extra layer of safety.',
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-8">
              <p className="section-label">Texas Tint Law</p>
              <h2 className="mt-4 font-display text-xl text-white">What&apos;s Legal in Texas</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-white">Front side windows:</strong> Must allow at least
                  25% visible light transmission (VLT).
                </li>
                <li>
                  <strong className="text-white">Windshield:</strong> Tint is allowed above the
                  AS-1 line (top 5 inches) with at least 25% VLT.
                </li>
                <li>
                  <strong className="text-white">Rear &amp; back windows:</strong> No VLT
                  restriction — go as dark as you want.
                </li>
                <li>
                  <strong className="text-white">Reflectivity:</strong> Front and back windows
                  cannot exceed 25% reflectiveness.
                </li>
              </ul>
            </div>

            <div className="panel p-8">
              <p className="section-label">FAQs</p>
              <h2 className="mt-4 font-display text-xl text-white">Common Questions</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-white">How long does installation take?</dt>
                  <dd className="mt-1 text-muted">
                    Most vehicles are completed in 1–3 hours depending on the number of windows
                    and film package selected.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">How long before I can roll my windows down?</dt>
                  <dd className="mt-1 text-muted">
                    We recommend waiting 3–5 days for the film to fully cure and bond to the
                    glass. Curing time can vary with weather conditions.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Will tint affect my vehicle&apos;s value?</dt>
                  <dd className="mt-1 text-muted">
                    Professional tint protects your interior from UV damage and fading, which
                    helps maintain — and can even increase — your vehicle&apos;s resale value.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">What tint percentage should I choose?</dt>
                  <dd className="mt-1 text-muted">
                    It depends on your priorities. 25% VLT is the legal front-window limit in
                    Texas and offers a great balance. Use our visualizer above to compare options.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="panel p-8 text-center md:p-10">
            <h2 className="font-display text-2xl text-white">Ready to tint?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Book your appointment online or call us at{' '}
              <a href="tel:14695316909" className="text-gold hover:underline">(469) 531‑6909</a>{' '}
              for a free consultation.
            </p>
            <Link
              href="/book-now"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Book now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
