const promos = [
  {
    title: 'Buy now, pay later',
    copy: 'Split ceramic tint, PPF, or glass replacement into flexible payments. Ask about eligibility in-store.',
  },
  {
    title: 'Bundle pricing',
    copy: 'Front clip + ceramic windshield + side glass packages. Designed for quick approval and clean installs.',
  },
];

export function Promotions() {
  return (
    <section className="panel p-8" id="promotions">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-lg space-y-3">
          <p className="section-label">Promotions</p>
          <h2 className="font-display text-3xl text-white">Make the upgrade easy to say yes to.</h2>
          <p className="text-sm text-muted">
            Borrowing the same structural idea as Tint World: one block for promos + one block for financing.
          </p>
        </div>

        <div className="grid flex-1 gap-5 md:grid-cols-2">
          {promos.map((promo) => (
            <div key={promo.title} className="mock-frame card-sheen p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(212,175,55,0.78)]">
                {promo.title}
              </p>
              <p className="mt-4 text-sm text-muted">{promo.copy}</p>
              <div className="mt-6 space-y-3">
                <div className="mock-line gold" />
                <div className="mock-line" style={{ width: '78%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
