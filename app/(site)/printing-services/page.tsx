import Link from 'next/link';

export default function PrintingServicesPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-8">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Printing Services</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Signs, Graphics &amp; More
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              From business signage and event banners to custom decals and promotional graphics, we
              help your brand look sharp. Tell us about your project — size, material, and timeline
              — and we&apos;ll walk you through options and pricing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/printing-services/catalog"
                className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-night"
              >
                View catalog
              </Link>
              <Link
                href="/book-now"
                className="inline-flex rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-white"
              >
                Request a quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="panel p-8 md:p-10">
            <p className="section-label">What we can help with</p>
            <h2 className="mt-4 font-display text-2xl text-white sm:text-3xl">
              Popular project types
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Business & retail signage',
                  body: 'Exterior and interior signs that match your brand and local requirements.',
                },
                {
                  title: 'Banners & displays',
                  body: 'Trade show backdrops, retractable banners, and event-ready graphics.',
                },
                {
                  title: 'Decals & stickers',
                  body: 'Cut vinyl, window graphics, and durable labels in the sizes you need.',
                },
                {
                  title: 'Vehicle graphics',
                  body: 'Complement your wrap with door logos, service panels, and fleet matching.',
                },
                {
                  title: 'Reproduction & files',
                  body: 'Bring print-ready art or work with us to refine layout and color.',
                },
                {
                  title: 'Rush & scheduling',
                  body: "Share your deadline early — we'll be upfront about what we can deliver.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
