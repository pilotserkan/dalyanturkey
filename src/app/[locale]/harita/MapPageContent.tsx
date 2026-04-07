'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import HomeMap from '@/components/ui/HomeMap';
import { POI_DATA } from '@/lib/constants';

export default function MapPageContent() {
  const t = useTranslations('harita');
  const nav = useTranslations('nav');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slim header */}
      <div className="bg-gradient-to-r from-sky-800 to-sky-900 text-white py-6 pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-sky-200">{t('subtitle')}</p>
        </div>
      </div>

      {/* Full-width map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HomeMap />
      </div>

      {/* POI list below map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Attractions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POI_DATA.filter(poi => poi.pageSlug).map((poi) => (
            <Link
              key={poi.id}
              href={`/${locale}/${poi.pageSlug}`}
              className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl flex-shrink-0">{poi.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                  {nav(poi.pageSlug?.split('/').pop() || poi.id)}
                </h3>
                <span className="text-xs text-gray-400 uppercase">{poi.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
