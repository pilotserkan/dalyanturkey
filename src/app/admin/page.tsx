import Link from 'next/link';
import { ALL_PAGE_SLUGS, HUBS, HUB_ORDER } from '@/lib/navigation';
import { locales } from '@/i18n/routing';

const stats = [
  {
    label: 'Total Pages',
    value: ALL_PAGE_SLUGS.length,
    description: `${HUB_ORDER.length} hubs + ${ALL_PAGE_SLUGS.length - HUB_ORDER.length} child/standalone pages`,
    color: 'blue',
    href: '/admin/pages',
  },
  {
    label: 'Languages',
    value: locales.length,
    description: locales.join(', ').toUpperCase(),
    color: 'emerald',
    href: '/admin/translations',
  },
  {
    label: 'Total URLs',
    value: ALL_PAGE_SLUGS.length * locales.length,
    description: `${ALL_PAGE_SLUGS.length} pages x ${locales.length} locales`,
    color: 'purple',
    href: '/admin/sitemap',
  },
  {
    label: 'SEO Entries',
    value: ALL_PAGE_SLUGS.length,
    description: 'Meta titles & descriptions configured',
    color: 'amber',
    href: '/admin/seo',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
};

const valueColorMap: Record<string, string> = {
  blue: 'text-blue-600',
  emerald: 'text-emerald-600',
  purple: 'text-purple-600',
  amber: 'text-amber-600',
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of dalyanturkey.com content and configuration.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`block p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${colorMap[stat.color]}`}
          >
            <p className="text-sm font-medium opacity-75">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${valueColorMap[stat.color]}`}>{stat.value}</p>
            <p className="text-xs mt-2 opacity-60">{stat.description}</p>
          </Link>
        ))}
      </div>

      {/* Hub breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Content Hubs</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {HUB_ORDER.map((hubSlug) => {
            const hub = HUBS[hubSlug];
            return (
              <div key={hubSlug} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{hub.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{hub.slug}</p>
                    <p className="text-sm text-gray-500">{hub.children.length} child pages</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Published
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/seo"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Review SEO Meta Tags</span>
          </Link>
          <Link
            href="/admin/translations"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Check Translation Coverage</span>
          </Link>
          <a
            href="https://dalyanturkey.com/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span className="text-sm font-medium text-gray-700">View Live Sitemap</span>
          </a>
        </div>
      </div>
    </div>
  );
}
