'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
export default function PageContent() {
  const t = useTranslations('hakkinda');
  const ct = useTranslations('common');
  const locale = useLocale();

  const sectionKeys = ['whereIs', 'geography', 'climate', 'howToGetThere', 'history', 'culture', 'accommodation', 'whyVisit'];

  const breadcrumbs = [
    { label: ct('nav.home'), href: `/${locale}` },
    { label: ct('nav.hakkinda'), href: `/${locale}/hakkinda/dalyan-nerede` },
  ];

  // Get highlights
  let highlights: string[] = [];
  try {
    const raw = t.raw('hakkinda.highlights');
    if (Array.isArray(raw)) {
      highlights = raw as string[];
    }
  } catch {
    // No highlights
  }

  return (
    <div>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        description={t('heroDescription')}
        backgroundImage="/images/dalyan-nature-path.jpg"
        badge={t('badge')}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {sectionKeys.map((sectionKey) => (
          <section key={sectionKey} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t(`hakkinda.sections.${sectionKey}.title`)}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              {t(`hakkinda.sections.${sectionKey}.content`)
                .split('\n\n')
                .map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </section>
        ))}

        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="mb-12 md:mb-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {ct('common.highlights')}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
