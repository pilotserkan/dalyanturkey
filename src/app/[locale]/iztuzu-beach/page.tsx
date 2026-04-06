'use client';

import { useTranslations } from 'next-intl';

const turtleFactKeys = ['f1', 'f2', 'f3', 'f4', 'f5'] as const;
const ruleKeys = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const;

const factIcons: Record<string, string> = {
  f1: '\u{1F4C5}',
  f2: '\u{1F4CA}',
  f3: '\u{1F95A}',
  f4: '\u{1F423}',
  f5: '\u{1F319}',
};

const transportIcons: Record<string, { icon: string; color: string }> = {
  byBoat: { icon: '\u{26F5}', color: 'from-blue-500 to-cyan-500' },
  byRoad: { icon: '\u{1F697}', color: 'from-amber-500 to-orange-500' },
  byMinibus: { icon: '\u{1F68C}', color: 'from-green-500 to-emerald-500' },
};

export default function IztuuzBeachPage() {
  const t = useTranslations('iztuzu');

  const facilityItems = t('facilities.items').split(',').map((s) => s.trim());

  return (
    <article>
      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 py-20 px-4 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-1/3 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-8 left-1/4 w-56 h-56 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <span className="text-5xl mb-4 block">{'\u{1F422}'}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t('title')}</h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* Beach Overview */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{'\u{1F3D6}'}</span>
            <h2 className="text-3xl font-bold text-gray-900">{t('overview.title')}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t('overview.description')}
          </p>
        </div>
      </section>

      {/* Caretta Caretta Turtles */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">{'\u{1F422}'}</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('turtles.title')}</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t('turtles.description')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {turtleFactKeys.map((fk) => (
              <div
                key={fk}
                className="bg-white rounded-xl shadow-sm border border-green-100 p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-2xl flex-shrink-0">{factIcons[fk]}</span>
                <p className="text-gray-700 text-sm font-medium">{t(`turtles.facts.${fk}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-4xl block mb-3">{'\u{1F4CD}'}</span>
          <h2 className="text-3xl font-bold text-gray-900">{t('gettingThere.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(['byBoat', 'byRoad', 'byMinibus'] as const).map((key) => {
            const { icon, color } = transportIcons[key];
            return (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`bg-gradient-to-r ${color} p-6 text-center`}>
                  <span className="text-5xl block">{icon}</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t(`gettingThere.${key}`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Beach Rules */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-4xl block mb-3">{'\u{1F4CB}'}</span>
            <h2 className="text-3xl font-bold text-gray-900">{t('rules.title')}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-8">
            <ul className="space-y-4">
              {ruleKeys.map((rk, i) => (
                <li
                  key={rk}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{t(`rules.${rk}`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-4xl block mb-3">{'\u{1F3D7}'}</span>
          <h2 className="text-3xl font-bold text-gray-900">{t('facilities.title')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilityItems.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white to-sky-50 rounded-xl border border-sky-100 shadow-sm p-5 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold">
                {'\u2713'}
              </span>
              <span className="text-gray-700 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
