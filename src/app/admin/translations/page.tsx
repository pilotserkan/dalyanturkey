import { promises as fs } from 'fs';
import path from 'path';
import { locales, localeNames } from '@/i18n/routing';

interface TranslationFileStatus {
  locale: string;
  localeName: string;
  file: string;
  keyCount: number;
  enKeyCount: number;
  missingKeys: string[];
  completionPercent: number;
}

function extractKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...extractKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

async function loadTranslationData(): Promise<TranslationFileStatus[]> {
  const messagesDir = path.join(process.cwd(), 'src/i18n/messages');
  const results: TranslationFileStatus[] = [];

  // Get English files as reference
  const enDir = path.join(messagesDir, 'en');
  const enFiles = await fs.readdir(enDir);
  const enKeysByFile: Record<string, string[]> = {};

  for (const file of enFiles) {
    if (!file.endsWith('.json')) continue;
    const raw = await fs.readFile(path.join(enDir, file), 'utf-8');
    const data = JSON.parse(raw);
    enKeysByFile[file] = extractKeys(data);
  }

  // Compare each locale against English
  for (const locale of locales) {
    const localeDir = path.join(messagesDir, locale);

    for (const file of enFiles) {
      if (!file.endsWith('.json')) continue;
      const enKeys = enKeysByFile[file];

      try {
        const raw = await fs.readFile(path.join(localeDir, file), 'utf-8');
        const data = JSON.parse(raw);
        const localeKeys = extractKeys(data);
        const missingKeys = enKeys.filter((k) => !localeKeys.includes(k));
        const completionPercent = enKeys.length > 0 ? Math.round(((enKeys.length - missingKeys.length) / enKeys.length) * 100) : 100;

        results.push({
          locale,
          localeName: localeNames[locale as keyof typeof localeNames] || locale,
          file,
          keyCount: localeKeys.length,
          enKeyCount: enKeys.length,
          missingKeys,
          completionPercent,
        });
      } catch {
        // File doesn't exist for this locale
        results.push({
          locale,
          localeName: localeNames[locale as keyof typeof localeNames] || locale,
          file,
          keyCount: 0,
          enKeyCount: enKeys.length,
          missingKeys: enKeys,
          completionPercent: 0,
        });
      }
    }
  }

  return results;
}

function getCompletionColor(percent: number): string {
  if (percent === 100) return 'bg-green-100 text-green-800';
  if (percent >= 80) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getBarColor(percent: number): string {
  if (percent === 100) return 'bg-green-500';
  if (percent >= 80) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default async function AdminTranslationsPage() {
  const data = await loadTranslationData();

  // Aggregate by locale
  const localeAggregates = locales.map((locale) => {
    const localeData = data.filter((d) => d.locale === locale);
    const totalKeys = localeData.reduce((sum, d) => sum + d.enKeyCount, 0);
    const translatedKeys = localeData.reduce((sum, d) => sum + d.keyCount, 0);
    const missingCount = localeData.reduce((sum, d) => sum + d.missingKeys.length, 0);
    const percent = totalKeys > 0 ? Math.round((translatedKeys / totalKeys) * 100) : 0;
    return {
      locale,
      name: localeNames[locale as keyof typeof localeNames] || locale,
      totalKeys,
      translatedKeys,
      missingCount,
      percent: Math.min(percent, 100),
      fileCount: localeData.length,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Translations</h1>
        <p className="text-gray-500 mt-1">
          Translation coverage across {locales.length} languages. English is the reference language.
        </p>
      </div>

      {/* Language overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {localeAggregates.map((agg) => (
          <div key={agg.locale} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">{agg.name}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCompletionColor(agg.percent)}`}>
                {agg.percent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getBarColor(agg.percent)}`}
                style={{ width: `${agg.percent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {agg.missingCount > 0 ? `${agg.missingCount} missing keys` : 'All keys translated'}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Keys</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">EN Keys</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Missing</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((entry, idx) => (
              <tr key={`${entry.locale}-${entry.file}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-2">
                  <span className="text-sm font-medium text-gray-900">{entry.localeName}</span>
                  <span className="text-xs text-gray-400 ml-1">({entry.locale})</span>
                </td>
                <td className="px-4 py-2">
                  <code className="text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{entry.file}</code>
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="text-sm font-mono text-gray-700">{entry.keyCount}</span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span className="text-sm font-mono text-gray-700">{entry.enKeyCount}</span>
                </td>
                <td className="px-4 py-2 text-center">
                  {entry.missingKeys.length > 0 ? (
                    <span className="text-sm font-mono text-red-600">{entry.missingKeys.length}</span>
                  ) : (
                    <span className="text-sm text-green-600">0</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompletionColor(entry.completionPercent)}`}>
                    {entry.completionPercent}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Missing keys details */}
      {data.filter((d) => d.missingKeys.length > 0).length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Missing Keys Details</h2>
          <div className="space-y-4">
            {data
              .filter((d) => d.missingKeys.length > 0)
              .slice(0, 20)
              .map((entry) => (
                <div key={`${entry.locale}-${entry.file}-missing`} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <p className="text-sm font-medium text-red-800">
                    {entry.localeName} ({entry.locale}) - {entry.file}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entry.missingKeys.slice(0, 10).map((key) => (
                      <code key={key} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        {key}
                      </code>
                    ))}
                    {entry.missingKeys.length > 10 && (
                      <span className="text-xs text-red-600">+{entry.missingKeys.length - 10} more</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
