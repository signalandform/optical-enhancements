const amenities = [
  'Free WiFi',
  'Pet friendly',
  'Overnight drop-off',
  'Mobile concierge',
  'Climate-controlled bays',
  'Dealer / fleet friendly',
];

export function Amenities() {
  return (
    <section className="panel p-8" id="amenities">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-lg space-y-3">
          <p className="section-label">Studio amenities</p>
          <h2 className="font-display text-3xl text-white">Comfort while we work. Process while you watch.</h2>
          <p className="text-sm text-muted">
            Same idea as Tint World’s location page: quick facts, clear actions, and trust signals—styled in Optical’s black
            and gold deck language.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-[28rem]">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(230,230,230,0.92)]"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
