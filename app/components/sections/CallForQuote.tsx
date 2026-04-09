export function CallForQuote() {
  return (
    <section className="band-gold px-8 py-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em]">Call for instant quote</p>
      <p className="mt-3 text-3xl font-semibold">(469) 531‑6909</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="tel:14695316909"
          className="rounded-full bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(255,246,222,0.95)]"
        >
          Call now
        </a>
      </div>
    </section>
  );
}
