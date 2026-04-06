'use client';

import { useTranslations } from 'next-intl';

const tourKeys = ['river', 'turtle', 'mud', 'moonlight', 'discovery'] as const;

const tourIcons: Record<string, string> = {
  river: '\u{1F6A2}',
  turtle: '\u{1F422}',
  mud: '\u{1F9D6}',
  moonlight: '\u{1F319}',
  discovery: '\u{1F9ED}',
};

const tourAccentColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  river: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
  turtle: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
  mud: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
  moonlight: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800' },
  discovery: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' },
};

export default function BoatToursPage() {
  const t = useTranslations('boatTours');

  return (
    <article>
      {/* Page Header */}
      <header className="relative bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 py-20 px-4 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <span className="text-5xl mb-4 block">{'\u{26F5}'}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t('title')}</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* Tour Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-12">
          {tourKeys.map((key, index) => {
            const colors = tourAccentColors[key];
            const isReversed = index % 2 === 1;
            const includedItems = t(`tours.${key}.included`).split(',').map((s) => s.trim());
            const highlightItems = t(`tours.${key}.highlights`).split(',').map((s) => s.trim());

            return (
              <div
                key={key}
                className={`group rounded-2xl border ${colors.border} ${colors.bg} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  {/* Icon / Visual Panel */}
                  <div className="lg:w-1/3 flex items-center justify-center py-12 px-8 bg-gradient-to-br from-white/60 to-transparent">
                    <div className="text-center">
                      <span className="text-7xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                        {tourIcons[key]}
                      </span>
                      <h2 className={`text-2xl font-bold ${colors.text}`}>
                        {t(`tours.${key}.title`)}
                      </h2>
                      <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${colors.badge}`}>
                        {t(`tours.${key}.duration`)}
                      </span>
                    </div>
                  </div>

                  {/* Content Panel */}
                  <div className="lg:w-2/3 p-8">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {t(`tours.${key}.description`)}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* What's Included */}
                      <div>
                        <h3 className={`text-sm font-bold uppercase tracking-wider ${colors.text} mb-3`}>
                          {t('included')}
                        </h3>
                        <ul className="space-y-2">
                          {includedItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${colors.badge} flex items-center justify-center text-xs`}>
                                {'\u2713'}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tour Highlights */}
                      <div>
                        <h3 className={`text-sm font-bold uppercase tracking-wider ${colors.text} mb-3`}>
                          {t('highlights')}
                        </h3>
                        <ul className="space-y-2">
                          {highlightItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${colors.badge} flex items-center justify-center text-xs`}>
                                {'\u2605'}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-gray-200 gap-4">
                      <span className="text-2xl font-bold text-gray-900">
                        {t(`tours.${key}.price`)}
                      </span>
                      <button
                        type="button"
                        className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                          key === 'river' ? 'bg-blue-600 hover:bg-blue-700' :
                          key === 'turtle' ? 'bg-green-600 hover:bg-green-700' :
                          key === 'mud' ? 'bg-amber-600 hover:bg-amber-700' :
                          key === 'moonlight' ? 'bg-indigo-600 hover:bg-indigo-700' :
                          'bg-rose-600 hover:bg-rose-700'
                        }`}
                      >
                        {t('bookCta')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
