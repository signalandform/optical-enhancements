import type { Metadata } from 'next';
import Link from 'next/link';
import { printingCatalogByCategory, type PrintingCategory } from '@/lib/printingCatalog';

export const metadata: Metadata = {
  title: 'Printing catalog',
  description:
    'Browse printing services: signage, banners, decals, and promotional products. Request a quote for custom sizes and materials.',
};

const CATEGORY_ORDER: PrintingCategory[] = [
  'Signage',
  'Banners & displays',
  'Decals & labels',
  'Promotional',
];

export default function PrintingCatalogPage() {
  const byCategory = printingCatalogByCategory();

  return (
    <main className="site-bg">
      <section className="relative z-[1] mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Printing Services</p>
            <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Product catalog</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Sample products and price hints for planning. Final pricing depends on size, material,
              turnaround, and install — use{' '}
              <Link href="/book-now" className="text-gold underline decoration-gold/40 underline-offset-2 hover:decoration-gold">
                Book now
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-gold underline decoration-gold/40 underline-offset-2 hover:decoration-gold">
                Contact
              </Link>{' '}
              for a firm quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/printing-services"
              className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-white"
            >
              Overview
            </Link>
            <Link
              href="/book-now"
              className="inline-flex rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-night"
            >
              Request a quote
            </Link>
          </div>
        </div>

        <div className="space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const items = byCategory[category];
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="border-b border-white/10 pb-2 font-display text-xl text-white">
                  {category}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <li key={product.id}>
                      <article className="panel flex h-full flex-col p-5">
                        <div className="mb-3 aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-black/20">
                          <div className="flex h-full items-center justify-center p-4 text-center">
                            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/30">
                              Image placeholder
                            </span>
                          </div>
                        </div>
                        <h3 className="font-display text-lg text-white">{product.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {product.description}
                        </p>
                        <p className="mt-4 text-sm font-semibold text-gold">{product.priceNote}</p>
                        <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-white/40">
                          SKU: {product.id}
                        </p>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
