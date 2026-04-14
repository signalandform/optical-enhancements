import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opticalautoenhancements.com';

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/window-tint`, lastModified: new Date() },
    { url: `${base}/vehicle-wraps`, lastModified: new Date() },
    { url: `${base}/paint-protection`, lastModified: new Date() },
    { url: `${base}/glass-replacement`, lastModified: new Date() },
    { url: `${base}/book-now`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
