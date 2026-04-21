export type PrintingCategory = 'Signage' | 'Banners & displays' | 'Decals & labels' | 'Promotional';

export type PrintingProduct = {
  id: string;
  name: string;
  category: PrintingCategory;
  description: string;
  /** Display string for price range or quote — replace when wired to a backend */
  priceNote: string;
};

/**
 * Placeholder catalog for Printing Services. Swap or hydrate from CMS / DB when ready.
 */
export const PRINTING_CATALOG: PrintingProduct[] = [
  {
    id: 'alum-comp',
    name: 'Aluminum composite panel sign',
    category: 'Signage',
    description: 'Durable outdoor building sign with print or vinyl. Custom sizes; pole or wall mount.',
    priceNote: 'Quote',
  },
  {
    id: 'acrylic-lobby',
    name: 'Acrylic lobby sign',
    category: 'Signage',
    description: 'Frosted or clear acrylic with second-surface print or standoff mounting.',
    priceNote: 'From $180',
  },
  {
    id: 'retractable',
    name: 'Retractable banner stand',
    category: 'Banners & displays',
    description: '33" × 80" common size; includes hardware and carry bag. Single- or double-sided print.',
    priceNote: 'From $120',
  },
  {
    id: 'vinyl-banner',
    name: 'Vinyl event banner',
    category: 'Banners & displays',
    description: '13 oz scrim, hemmed and grommeted. Indoor/outdoor. Submit art or we can layout.',
    priceNote: 'From $65',
  },
  {
    id: 'window-perf',
    name: 'Perforated window film',
    category: 'Decals & labels',
    description: 'One-way vision for storefronts and fleet. UV print; we install or ship rolled.',
    priceNote: 'Quote',
  },
  {
    id: 'die-cut-vinyl',
    name: 'Die-cut vinyl graphics',
    category: 'Decals & labels',
    description: 'Plotter-cut letters and logos. Multiple vinyl grades for flat, simple curves, or high-energy.',
    priceNote: 'From $40',
  },
  {
    id: 'coroplast',
    name: 'Yard / political signs (coroplast)',
    category: 'Promotional',
    description: '18" × 24" and 24" × 18" H-stake standard. Short-run and bulk pricing.',
    priceNote: 'From $18 ea.',
  },
  {
    id: 'business-cards',
    name: 'Business cards (standard)',
    category: 'Promotional',
    description: '16 pt matte or gloss, 2-sided. 500-count typical run; design help available.',
    priceNote: 'From $45 / 500',
  },
];

export function printingCatalogByCategory(
  products: PrintingProduct[] = PRINTING_CATALOG
): Record<PrintingCategory, PrintingProduct[]> {
  const keys: PrintingCategory[] = [
    'Signage',
    'Banners & displays',
    'Decals & labels',
    'Promotional',
  ];
  return keys.reduce(
    (acc, cat) => {
      acc[cat] = products.filter((p) => p.category === cat);
      return acc;
    },
    {} as Record<PrintingCategory, PrintingProduct[]>
  );
}
