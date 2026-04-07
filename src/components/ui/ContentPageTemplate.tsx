'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import LocationMiniMap from '@/components/ui/LocationMiniMap';
import { HUBS, type HubSlug } from '@/lib/navigation';

interface ContentPageTemplateProps {
  namespace: string;
  pageKey: string;
  sectionKeys: string[];
  hubSlug: string;
  backgroundImage: string;
  lat?: number;
  lng?: number;
  mapIcon?: string;
}

export default function ContentPageTemplate({
  namespace,
  pageKey,
  sectionKeys,
  hubSlug,
  backgroundImage,
  lat,
  lng,
  mapIcon,
}: ContentPageTemplateProps) {
  const t = useTranslations(namespace);
  const ct = useTranslations('common');
  const nav = useTranslations('nav');
  const hubT = useTranslations('hub');
  const locale = useLocale();

  const hub = HUBS[hubSlug as HubSlug];
  const hubName = hub ? nav(hub.translationKey.replace('nav.', '')) : hubSlug;

  const breadcrumbs = [
    { label: nav('home'), href: `/${locale}` },
    { label: hubName, href: `/${locale}/${hubSlug}` },
    { label: t(`${pageKey}.title`), href: `/${locale}/${hubSlug}/${pageKey}` },
  ];

  // Get highlights if they exist
  let highlights: string[] = [];
  try {
    const raw = t.raw(`${pageKey}.highlights`);
    if (Array.isArray(raw)) {
      highlights = raw as string[];
    }
  } catch {
    // No highlights
  }

  // Get practical info tip if it exists
  let practicalTip = '';
  try {
    practicalTip = t(`${pageKey}.practicalInfo.tip`) || t(`${pageKey}.practicalInfo.tips`) || '';
  } catch {
    // No tip
  }

  // Get related pages from hub children (excluding current page)
  const relatedPages = hub?.children?.filter(
    (child) => child.slug !== pageKey.replace(/([A-Z])/g, '-$1').toLowerCase()
  ) ?? [];

  return (
    <div>
      {/* Hero */}
      <PageHero
        title={t(`${pageKey}.title`)}
        subtitle={t(`${pageKey}.subtitle`)}
        description={t(`${pageKey}.heroDescription`)}
        backgroundImage={backgroundImage}
        breadcrumbs={breadcrumbs}
      />

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {sectionKeys.map((sectionKey, index) => (
          <section
            key={sectionKey}
            className={`mb-12 md:mb-16 ${
              index % 2 === 1 ? 'md:flex md:flex-row-reverse md:gap-12' : ''
            }`}
          >
            <div className={index % 2 === 1 ? 'md:w-full' : ''}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t(`${pageKey}.sections.${sectionKey}.title`)}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {t(`${pageKey}.sections.${sectionKey}.content`)
                  .split('\n\n')
                  .map((paragraph: string, pIndex: number) => (
                    <p key={pIndex} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </section>
        ))}

        {/* Location Map */}
        {lat && lng && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              📍 Location
            </h2>
            <LocationMiniMap
              lat={lat}
              lng={lng}
              title={t(`${pageKey}.title`)}
              icon={mapIcon || '📍'}
            />
          </section>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="mb-12 md:mb-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {ct('highlights')}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Practical Tip */}
        {practicalTip && (
          <section className="mb-12 md:mb-16 border-l-4 border-sky-500 bg-sky-50 rounded-r-xl p-6">
            <h3 className="text-lg font-bold text-sky-900 mb-2">
              {ct('proTip')}
            </h3>
            <p className="text-sky-800">{practicalTip}</p>
          </section>
        )}

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {hubT('relatedPages')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPages.slice(0, 6).map((page) => (
                <Link
                  key={page.slug}
                  href={`/${locale}/${hubSlug}/${page.slug}`}
                  className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all"
                >
                  <span className="text-2xl mb-3 block">{page.icon}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                    {nav(page.translationKey.replace('nav.', ''))}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
