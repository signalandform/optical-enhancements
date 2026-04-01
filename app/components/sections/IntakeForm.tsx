export function IntakeForm() {
  return (
    <section id="intake" className="panel p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3 text-center">
          <p className="section-label">Book a build slot</p>
          <h3 className="font-display text-3xl text-white">Tell us what vehicle you’re bringing in.</h3>
          <p className="mx-auto max-w-2xl text-sm text-muted">
            We’ll reply with available bay times, film recommendations, and a deck-style quote so you can approve the look
            before drop-off.
          </p>
        </div>

        <form className="mx-auto grid max-w-md gap-4 text-sm">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Name</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="First & Last"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Vehicle</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="Year / Make / Model"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Service</span>
            <select className="w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none">
              <option>Window tint</option>
              <option>Paint protection film</option>
              <option>Windshield / glass replacement</option>
              <option>Chrome delete / graphics</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Notes</span>
            <textarea
              className="h-28 w-full rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="Preferred drop-off date, timelines, inspiration…"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-night"
          >
            Submit request
          </button>
        </form>
      </div>
    </section>
  );
}
