import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://dalyanturkey.com';

const pages = ['', 'ancient-sites', 'boat-tours', 'iztuzu-beach', 'map', 'about'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
