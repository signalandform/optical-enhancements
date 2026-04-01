export function CTA() {
  return (
    <section className="panel p-8 text-center" id="cta">
      <p className="section-label">Studio</p>
      <h3 className="mt-4 font-display text-3xl">1516 Osprey Dr #207 · DeSoto, TX</h3>
      <p className="mt-2 text-sm text-muted">Open today until 6 PM · Same-day appointments when bays are clear.</p>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="tel:14695316909"
          className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night"
        >
          Call 469‑531‑6909
        </a>
        <a
          href="https://maps.apple.com/?address=1516%20Osprey%20Dr,%20DeSoto,%20TX%2075135,%20United%20States&auid=17691445972910688211&ll=32.597240,-96.854950&lsp=9902&q=Optical%20Auto"
          className="rounded-full border border-gold/60 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          target="_blank"
          rel="noreferrer"
        >
          Get directions
        </a>
      </div>
    </section>
  );
}
