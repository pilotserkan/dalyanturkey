'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const sites = [
  {
    key: 'kaunos',
    emoji: '🏛️',
    gradient: 'from-amber-600 to-orange-700',
    bgGradient: 'from-amber-50 to-orange-50',
    accentColor: 'amber',
  },
  {
    key: 'rockTombs',
    emoji: '⛰️',
    gradient: 'from-stone-600 to-gray-700',
    bgGradient: 'from-stone-50 to-gray-50',
    accentColor: 'stone',
  },
  {
    key: 'canal',
    emoji: '🚣',
    gradient: 'from-sky-600 to-blue-700',
    bgGradient: 'from-sky-50 to-blue-50',
    accentColor: 'sky',
  },
];

export default function AncientSitesPage() {
  const t = useTranslations('ancientSites');
  const tInfo = useTranslations('ancientSites.infoBox');
  const locale = useLocale();

  return (
    <div>
      {/* Page Header */}
      <section className="relative py-32 bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/rock-tombs-night.jpg')`,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-500/30 text-amber-200 text-sm font-semibold rounded-full mb-6 tracking-wide uppercase border border-amber-400/30">
            {t('badge')}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 text-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-amber-200/90 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Site Sections */}
      {sites.map((site, index) => (
        <section
          key={site.key}
          className={`relative py-24 bg-gradient-to-b ${site.bgGradient}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <article>
              {/* Section Header */}
              <div className={`flex flex-col ${index % 2 === 1 ? 'md:items-end md:text-right' : ''} mb-12`}>
                <div className="text-6xl mb-4">{site.emoji}</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  {t(`${site.key}.title`)}
                </h2>
                <span
                  className={`inline-block w-fit px-4 py-1.5 bg-gradient-to-r ${site.gradient} text-white text-sm font-semibold rounded-full`}
                >
                  {t(`${site.key}.period`)}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                {t(`${site.key}.description`)}
              </p>

              {/* Highlights */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {tInfo('highlights')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t(`${site.key}.highlights`)
                    .split(',')
                    .map((highlight: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${site.gradient} flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5`}>
                          {i + 1}
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {highlight.trim()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Visiting Info */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tInfo('visitingInfo')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`${site.key}.visitingInfo`)}
                </p>
              </div>

              {/* Pro Tip */}
              <div className={`rounded-2xl p-8 bg-gradient-to-r ${site.gradient} text-white shadow-lg`}>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {tInfo('proTip')}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {t(`${site.key}.proTip`)}
                </p>
              </div>
            </article>
          </div>

          {/* Section divider */}
          {index < sites.length - 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          )}
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/boat-tours`}
              className="inline-flex items-center justify-center px-8 py-4 bg-sky-700 text-white font-semibold rounded-full hover:bg-sky-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t('cta.bookTour')}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/map`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-semibold rounded-full border-2 border-sky-700 hover:bg-sky-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t('cta.viewMap')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
