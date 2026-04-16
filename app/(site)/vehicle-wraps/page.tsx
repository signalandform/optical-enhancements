import Link from 'next/link';

export default function VehicleWrapsPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-8">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Vehicle Wraps</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Transform Your Ride, Protect Your Paint
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              A vehicle wrap is a large sheet of premium vinyl applied directly over your
              factory paint — giving you a completely new color, finish, or custom design
              without a permanent commitment. When removed, your original paint is untouched
              underneath. Wraps are the fastest way to change your vehicle&apos;s look while
              also adding a layer of paint protection.
            </p>
            <Link
              href="/book-now"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Get a quote
            </Link>
          </div>

          <div className="panel p-8 md:p-10">
            <p className="section-label">Why wrap?</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              More Than Just a Color Change
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Unlimited Design Freedom',
                  body: 'Choose from hundreds of colors, finishes (gloss, matte, satin, metallic, carbon fiber), and fully custom graphics — options paint can\'t match.',
                },
                {
                  title: 'Paint Protection',
                  body: 'Vinyl shields your factory finish from UV damage, minor scratches, chips, and environmental contaminants while the wrap is on.',
                },
                {
                  title: 'Fully Reversible',
                  body: 'Leased vehicle or just want a change? Professional removal takes a few hours and leaves your original paint in the same condition as the day it was wrapped.',
                },
                {
                  title: 'Preserves Resale Value',
                  body: 'Your factory paint stays protected underneath, which can actually increase resale value compared to a repaint or unprotected finish.',
                },
                {
                  title: 'Faster Than Paint',
                  body: 'A full wrap typically takes 3–5 days versus 1–2 weeks for a quality respray — and you get a result that\'s just as striking.',
                },
                {
                  title: 'Cost-Effective',
                  body: 'A full wrap runs significantly less than a high-quality paint job and lasts 5–7 years with proper care.',
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
              <p className="section-label">Wrap Types</p>
              <h2 className="mt-4 font-display text-xl text-white">
                Finishes &amp; Coverage
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-white">Full Color Change:</strong> Complete coverage
                  from bumper to bumper in a new color or finish — gloss, matte, satin,
                  metallic, or chrome.
                </li>
                <li>
                  <strong className="text-white">Partial Wrap:</strong> Accent panels like the
                  roof, hood, mirrors, or trim pieces for a two-tone or sport look.
                </li>
                <li>
                  <strong className="text-white">Chrome Delete:</strong> Replace factory chrome
                  trim with satin black, gloss black, or body-color vinyl for a modern,
                  blacked-out appearance.
                </li>
                <li>
                  <strong className="text-white">Custom Graphics:</strong> Business branding,
                  racing stripes, custom art — we can produce and install virtually any design.
                </li>
              </ul>
            </div>

            <div className="panel p-8">
              <p className="section-label">FAQs</p>
              <h2 className="mt-4 font-display text-xl text-white">Common Questions</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-white">How long does a wrap last?</dt>
                  <dd className="mt-1 text-muted">
                    With proper care, a quality vinyl wrap lasts 5–7 years. Keeping it garaged
                    or in shade when possible extends the lifespan.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Can I wash my wrapped vehicle?</dt>
                  <dd className="mt-1 text-muted">
                    Yes — hand wash with mild soap and water. Avoid automatic car washes with
                    abrasive brushes. Pressure washers are fine below 2,000 PSI.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Will the wrap damage my paint?</dt>
                  <dd className="mt-1 text-muted">
                    No. When professionally installed and removed, vinyl wraps do not damage
                    factory paint. In fact, they help preserve it.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">How long does installation take?</dt>
                  <dd className="mt-1 text-muted">
                    A full wrap typically takes 3–5 days including prep, installation, and post
                    heat curing. Partial wraps and chrome deletes can often be done in 1–2 days.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="panel p-8 text-center md:p-10">
            <h2 className="font-display text-2xl text-white">Ready for a new look?</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Book a consultation or call{' '}
              <a href="tel:14695316909" className="text-gold hover:underline">(469) 531‑6909</a>{' '}
              to discuss colors, finishes, and pricing for your vehicle.
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
