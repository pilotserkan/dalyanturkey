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

      // Build alternates for this page across all locales
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        const altPath = slug === '' ? `/${altLocale}` : `/${altLocale}/${slug}`;
        languages[altLocale] = `${BASE_URL}${altPath}`;
      }

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: isHome ? 1.0 : isHub ? 0.9 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
