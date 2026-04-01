export function About() {
  return (
    <section className="panel p-8" id="about">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <p className="section-label">About Optical</p>
          <h2 className="font-display text-3xl text-white">A premium bay built for tint, PPF, and glass—without the chaos.</h2>
          <p className="text-sm text-muted">
            This section mirrors the “About Tint World [Location]” block structurally: location clarity, what you do, and
            why someone should trust the install.
          </p>
          <p className="text-sm text-muted">
            We handle ceramic window tint, paint protection film, windshield &amp; glass replacement, chrome delete, and
            graphics—served with documentation, warranty clarity, and a quote deck that looks like the final vehicle.
          </p>
        </div>

        <div className="mock-frame card-sheen p-6">
          <p className="section-label">Service area</p>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <p className="text-white/90">DeSoto · Dallas · Duncanville · Cedar Hill · Lancaster · Grand Prairie</p>
            <div className="grid-divider pt-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[rgba(212,175,55,0.7)]">Powered by</p>
              <p className="mt-2 text-sm text-muted">Pro film stacks + calibrated lighting + delivery checklists.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
