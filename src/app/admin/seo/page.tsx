import { promises as fs } from 'fs';
import path from 'path';

interface MetaEntry {
  page: string;
  title: string;
  description: string;
  descLength: number;
}

async function loadSeoData(): Promise<MetaEntry[]> {
  const filePath = path.join(process.cwd(), 'src/i18n/messages/en/common.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const metadata = data.metadata || {};

  const entries: MetaEntry[] = [];
  for (const [key, value] of Object.entries(metadata)) {
    const meta = value as { title: string; description: string };
    entries.push({
      page: key,
      title: meta.title || '',
      description: meta.description || '',
      descLength: (meta.description || '').length,
    });
  }

  return entries;
}

function getStatusColor(length: number): string {
  if (length >= 150 && length <= 160) return 'bg-green-100 text-green-800';
  if (length >= 120 && length < 150) return 'bg-yellow-100 text-yellow-800';
  if (length > 160 && length <= 170) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getStatusLabel(length: number): string {
  if (length >= 150 && length <= 160) return 'Optimal';
  if (length >= 120 && length < 150) return 'Short';
  if (length > 160 && length <= 170) return 'Slightly Long';
  if (length > 170) return 'Too Long';
  return 'Too Short';
}

export default async function AdminSeoPage() {
  const entries = await loadSeoData();

  const optimal = entries.filter((e) => e.descLength >= 150 && e.descLength <= 160).length;
  const short = entries.filter((e) => e.descLength < 150).length;
  const long = entries.filter((e) => e.descLength > 160).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-gray-500 mt-1">Review meta titles and descriptions for all pages (English).</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700 font-medium">Optimal (150-160 chars)</p>
          <p className="text-2xl font-bold text-green-800 mt-1">{optimal}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-700 font-medium">Too Short (&lt;150 chars)</p>
          <p className="text-2xl font-bold text-yellow-800 mt-1">{short}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700 font-medium">Too Long (&gt;160 chars)</p>
          <p className="text-2xl font-bold text-red-800 mt-1">{long}</p>
        </div>
      </div>

      {/* SEO Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Meta Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Meta Description</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Chars</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.map((entry, idx) => (
              <tr key={entry.page} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">{entry.page}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-700 max-w-xs truncate" title={entry.title}>
                    {entry.title}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600 max-w-md truncate" title={entry.description}>
                    {entry.description}
                  </p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm font-mono text-gray-700">{entry.descLength}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entry.descLength)}`}>
                    {getStatusLabel(entry.descLength)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hreflang Info */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Hreflang Status</h2>
        <p className="text-sm text-gray-600 mb-4">
          All pages include hreflang alternate links for all 10 supported languages via the locale layout generateMetadata function.
        </p>
        <div className="flex flex-wrap gap-2">
          {['en', 'de', 'ru', 'nl', 'fr', 'es', 'it', 'tr', 'ar', 'zh'].map((locale) => (
            <span
              key={locale}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {locale.toUpperCase()} - Active
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
