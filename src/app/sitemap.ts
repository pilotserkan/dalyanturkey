import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { ALL_PAGE_SLUGS } from '@/lib/navigation';

const BASE_URL = 'https://dalyanturkey.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const slug of ALL_PAGE_SLUGS) {
    for (const locale of locales) {
      const path = slug === '' ? `/${locale}` : `/${locale}/${slug}`;
      const isHome = slug === '';
      const isHub = !slug.includes('/') && slug !== '';
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: isHome ? 1.0 : isHub ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
