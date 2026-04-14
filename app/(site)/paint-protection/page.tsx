export default function PaintProtectionPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Service page</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">Paint Protection</h1>
            <p className="mt-4 max-w-2xl text-sm text-muted">
              Placeholder scaffold for PPF coverage options, film technology, and care expectations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="panel p-6 md:p-8">
              <p className="section-label">What&apos;s included</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Coverage area package matrix</li>
                <li>Gloss and stealth finish variants</li>
                <li>Self-healing film details</li>
              </ul>
            </article>
            <article className="panel p-6 md:p-8">
              <p className="section-label">FAQs</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Expected lifespan by climate</li>
                <li>Wash and maintenance recommendations</li>
                <li>Difference vs ceramic coating</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
