import { ALL_PAGE_SLUGS } from '@/lib/navigation';
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://dalyanturkey.com';

interface SitemapEntry {
  url: string;
  locale: string;
  slug: string;
  priority: number;
  changeFrequency: string;
}

function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const slug of ALL_PAGE_SLUGS) {
    for (const locale of locales) {
      const path = `/${locale}/${slug}`;
      const isHub = !slug.includes('/') && slug !== '';

      entries.push({
        url: `${BASE_URL}${path}`,
        locale,
        slug,
        priority: isHub ? 0.9 : 0.8,
        changeFrequency: 'weekly',
      });
    }
  }

  return entries;
}

export default function AdminSitemapPage() {
  const entries = buildSitemapEntries();
  const totalUrls = entries.length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sitemap</h1>
          <p className="text-gray-500 mt-1">{totalUrls} URLs across {locales.length} locales.</p>
        </div>
        <a
          href={`${BASE_URL}/sitemap.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Live Sitemap
        </a>
      </div>

      {/* Summary by locale */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-8">
        {locales.map((locale) => {
          const count = entries.filter((e) => e.locale === locale).length;
          return (
            <div key={locale} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500 uppercase font-medium">{locale}</p>
            </div>
          );
        })}
      </div>

      {/* Locale-grouped tables */}
      {locales.map((locale) => {
        const localeEntries = entries.filter((e) => e.locale === locale);
        return (
          <div key={locale} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {locale.toUpperCase()} - {localeEntries.length} URLs
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">URL</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">Priority</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {localeEntries.map((entry, idx) => (
                    <tr key={entry.url} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-2">
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {entry.url.replace(BASE_URL, '')}
                        </a>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="text-sm font-mono text-gray-700">{entry.priority}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="text-sm text-gray-600">{entry.changeFrequency}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
