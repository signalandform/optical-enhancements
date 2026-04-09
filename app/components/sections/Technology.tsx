const additional = [
  {
    title: 'Residential styling',
    copy: 'Heat rejection films, privacy, and UV protection for homes—installed clean with long-term performance in mind.',
  },
  {
    title: 'Commercial styling',
    copy: 'Storefront films, security layers, and branded privacy treatments for offices and retail.',
  },
  {
    title: 'Marine styling',
    copy: 'Audio upgrades, protective films, and cabin comfort solutions for watercraft.',
  },
];

export function Technology() {
  return (
    <section className="panel p-8" id="additional">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <p className="section-label">Additional services</p>
          <h2 className="mt-3 font-display text-3xl text-white">Residential, commercial, and marine options.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">
            Mirrors Tint World’s “Additional Services” row—kept in Optical’s black/gold system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {additional.map((item) => (
            <article key={item.title} className="mock-frame card-sheen p-6">
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/book-now"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-night"
          >
            Book now
          </a>
          <a
            href="/book-now"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/25 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white"
          >
            Get quote
          </a>
        </div>
      </div>
    </section>
  );
}
