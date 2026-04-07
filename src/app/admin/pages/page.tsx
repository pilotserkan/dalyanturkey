import { HUBS, HUB_ORDER, STANDALONE_PAGES } from '@/lib/navigation';

interface PageEntry {
  name: string;
  slug: string;
  hub: string;
  path: string;
  icon: string;
}

function buildPageList(): PageEntry[] {
  const pages: PageEntry[] = [];

  for (const hubSlug of HUB_ORDER) {
    const hub = HUBS[hubSlug];
    // Hub index page
    pages.push({
      name: hub.translationKey.replace('nav.', ''),
      slug: hub.slug,
      hub: hub.slug,
      path: `/${hub.slug}`,
      icon: hub.icon,
    });
    // Child pages
    for (const child of hub.children) {
      pages.push({
        name: child.translationKey.replace('nav.', ''),
        slug: child.slug,
        hub: hub.slug,
        path: `/${hub.slug}/${child.slug}`,
        icon: child.icon,
      });
    }
  }

  // Standalone pages
  for (const page of STANDALONE_PAGES) {
    pages.push({
      name: page.translationKey.replace('nav.', ''),
      slug: page.slug,
      hub: 'Standalone',
      path: `/${page.slug}`,
      icon: page.icon,
    });
  }

  return pages;
}

const hubColors: Record<string, string> = {
  tarih: 'bg-amber-100 text-amber-800',
  doga: 'bg-emerald-100 text-emerald-800',
  wellness: 'bg-rose-100 text-rose-800',
  turlar: 'bg-sky-100 text-sky-800',
  'yeme-icme': 'bg-orange-100 text-orange-800',
  pratik: 'bg-slate-100 text-slate-800',
  Standalone: 'bg-gray-100 text-gray-800',
};

export default function AdminPagesPage() {
  const pages = buildPageList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-500 mt-1">{pages.length} pages across {HUB_ORDER.length} content hubs.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Page</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hub</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">URL Path</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((page, idx) => (
              <tr key={page.slug + page.hub} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{page.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">{page.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hubColors[page.hub] || 'bg-gray-100 text-gray-800'}`}>
                    {page.hub}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <code className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">/en{page.path}</code>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Published
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <a
                    href={`/en${page.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
