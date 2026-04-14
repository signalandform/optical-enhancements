export default function GlassReplacementPage() {
  return (
    <main className="site-bg">
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          <div className="panel p-8 md:p-10">
            <p className="section-label">Service page</p>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">Glass Replacement</h1>
            <p className="mt-4 max-w-2xl text-sm text-muted">
              Placeholder scaffold for windshield and auto glass replacement offerings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="panel p-6 md:p-8">
              <p className="section-label">What&apos;s included</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Windshield and side glass replacements</li>
                <li>Calibration and safety checklist placeholders</li>
                <li>Insurance workflow notes</li>
              </ul>
            </article>
            <article className="panel p-6 md:p-8">
              <p className="section-label">FAQs</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>How long replacement takes</li>
                <li>When to drive after installation</li>
                <li>Insurance claim process basics</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
