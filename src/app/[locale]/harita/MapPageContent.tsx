'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import { POI_DATA } from '@/lib/constants';

export default function MapPageContent() {
  const t = useTranslations('harita');
  const ct = useTranslations('common');
  const locale = useLocale();

  return (
    <div>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        description={t('heroDescription')}
        backgroundImage="/images/dalyan-blue-boat.jpg"
        breadcrumbs={[
          { label: ct('nav.home'), href: `/${locale}` },
          { label: t('title'), href: `/${locale}/harita` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Map placeholder - interactive map component will be integrated */}
        <div className="bg-gray-100 rounded-2xl p-8 min-h-[500px] flex items-center justify-center mb-12">
          <div className="text-center">
            <p className="text-6xl mb-4">&#x1F5FA;&#xFE0F;</p>
            <p className="text-xl font-semibold text-gray-700 mb-2">{t('title')}</p>
            <p className="text-gray-500">{t('heroDescription')}</p>
          </div>
        </div>

        {/* POI list as fallback / sidebar content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POI_DATA.filter(poi => poi.pageSlug).map((poi) => (
            <Link
              key={poi.id}
              href={`/${locale}/${poi.pageSlug}`}
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <span className="text-2xl mb-3 block">{poi.icon}</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                {t(`harita.pois.${poi.id}.name`)}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {t(`harita.pois.${poi.id}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
