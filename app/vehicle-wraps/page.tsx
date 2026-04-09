export default function VehicleWrapsPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Service page</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">Vehicle Wraps</h1>
            <p className="mt-4 max-w-2xl text-sm text-muted">
              Placeholder scaffold for wrap options, finish galleries, and maintenance guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="panel p-6 md:p-8">
              <p className="section-label">What&apos;s included</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Partial and full-wrap package tiers</li>
                <li>Color and texture finish options</li>
                <li>Protection and durability expectations</li>
              </ul>
            </article>
            <article className="panel p-6 md:p-8">
              <p className="section-label">FAQs</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Wrap lifespan and care</li>
                <li>OEM paint safety considerations</li>
                <li>Turnaround time by package</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
