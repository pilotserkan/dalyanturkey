'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg md:text-xl text-teal-100">{t('subtitle')}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-700 leading-relaxed">{t('intro')}</p>
        </section>

        {/* Geography & Climate */}
        <section>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">{t('geography.title')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('geography.description')}</p>
        </section>

        {/* How to Get Here */}
        <section>
          <h2 className="text-2xl font-bold text-teal-800 mb-6">{t('gettingHere.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-3" aria-hidden="true">&#9992;</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Airport</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('gettingHere.airport')}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-3" aria-hidden="true">&#128652;</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('gettingHere.bus')}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-3" aria-hidden="true">&#128663;</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Car</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('gettingHere.car')}</p>
            </div>
          </div>
        </section>

        {/* Culture & Cuisine */}
        <section>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">{t('culture.title')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('culture.description')}</p>
        </section>

        {/* Accommodation */}
        <section>
          <h2 className="text-2xl font-bold text-teal-800 mb-4">{t('accommodation.title')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('accommodation.description')}</p>
        </section>
      </div>
    </div>
  );
}
