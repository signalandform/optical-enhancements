import Link from 'next/link';

export default function PaintProtectionPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-8">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Paint Protection Film</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Invisible Armor for Your Paint
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              Paint protection film (PPF) is a clear, self-healing layer of thermoplastic
              urethane that shields your vehicle&apos;s finish from rock chips, road debris,
              bug acids, bird droppings, and everyday scratches. Originally developed for
              military helicopter blades, it&apos;s now the gold standard in automotive paint
              preservation.
            </p>
            <Link
              href="/book-now"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Get a quote
            </Link>
          </div>

          <div className="panel p-8 md:p-10">
            <p className="section-label">Why PPF?</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              Protection That Pays for Itself
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Self-Healing Technology',
                  body: 'Minor scratches and swirl marks vanish on their own when exposed to heat or direct sunlight — the film literally repairs itself.',
                },
                {
                  title: 'Rock Chip Defense',
                  body: 'The film absorbs impacts from gravel, road debris, and door dings. Vehicles with PPF experience roughly 30% less paint damage over time.',
                },
                {
                  title: 'UV & Oxidation Shield',
                  body: 'Blocks harmful UV rays that cause paint fading, oxidation, and clear coat breakdown — keeping your color factory-fresh for years.',
                },
                {
                  title: 'Hydrophobic Surface',
                  body: 'Water, dirt, and contaminants bead off the surface, making your vehicle easier to wash and quicker to dry.',
                },
                {
                  title: 'Preserves Resale Value',
                  body: 'PPF keeps your factory paint in pristine condition underneath. Studies show it can increase resale value by 10–15%.',
                },
                {
                  title: 'Virtually Invisible',
                  body: 'High-quality PPF is optically clear — no orange peel, no yellowing. It enhances gloss without changing the look of your paint.',
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
              <p className="section-label">Coverage Options</p>
              <h2 className="mt-4 font-display text-xl text-white">
                Partial or Full — Your Call
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-white">Partial Front End:</strong> Hood, fenders, front
                  bumper, mirrors, and headlights — the impact zones that take the most abuse on
                  the highway.
                </li>
                <li>
                  <strong className="text-white">Full Front End:</strong> Full hood, full fenders,
                  A-pillars, and rocker panels for maximum rock chip coverage.
                </li>
                <li>
                  <strong className="text-white">Full Body Wrap:</strong> Every painted surface
                  gets protected — ideal for high-end and performance vehicles.
                </li>
                <li>
                  <strong className="text-white">High-Impact Zones:</strong> Custom packages for
                  door edges, door cups, trunk ledge, and behind wheel arches.
                </li>
              </ul>
            </div>

            <div className="panel p-8">
              <p className="section-label">FAQs</p>
              <h2 className="mt-4 font-display text-xl text-white">Common Questions</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-white">How long does PPF last?</dt>
                  <dd className="mt-1 text-muted">
                    Premium PPF lasts 6–12 years depending on the film quality, environmental
                    conditions, and how well the vehicle is maintained.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Will PPF yellow over time?</dt>
                  <dd className="mt-1 text-muted">
                    Modern top-tier films are engineered with UV-stable top coats that resist
                    yellowing and discoloration for the life of the film.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Can PPF be removed?</dt>
                  <dd className="mt-1 text-muted">
                    Yes — professional removal leaves your factory paint untouched underneath.
                    It&apos;s designed to be non-destructive when removed correctly.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">PPF vs. ceramic coating — what&apos;s the difference?</dt>
                  <dd className="mt-1 text-muted">
                    Ceramic coatings enhance gloss and repel contaminants but don&apos;t protect
                    against physical impacts. PPF stops rock chips and scratches. Many owners
                    layer ceramic coating on top of PPF for the best of both worlds.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="panel p-8 text-center md:p-10">
            <h2 className="font-display text-2xl text-white">Protect your investment</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
              Book a consultation or call{' '}
              <a href="tel:14695316909" className="text-gold hover:underline">(469) 531‑6909</a>{' '}
              and we&apos;ll walk you through the right coverage package for your vehicle.
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
