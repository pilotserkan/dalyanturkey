'use client';

import { useLocale } from 'next-intl';
import { getWeatherText } from '@/lib/weather-i18n';

/* ------------------------------------------------------------------ */
/*  Dalyan average monthly data (historical averages)                  */
/* ------------------------------------------------------------------ */
const MONTHS = [
  { key: 'jan', airHigh: 15, airLow: 6,  seaTemp: 17, rain: 170, sun: 5,  wind: 12, uv: 2, humidity: 70, wave: 1.0, swim: false },
  { key: 'feb', airHigh: 16, airLow: 6,  seaTemp: 16, rain: 130, sun: 6,  wind: 11, uv: 3, humidity: 65, wave: 1.2, swim: false },
  { key: 'mar', airHigh: 19, airLow: 8,  seaTemp: 17, rain: 80,  sun: 7,  wind: 10, uv: 5, humidity: 60, wave: 0.8, swim: false },
  { key: 'apr', airHigh: 23, airLow: 11, seaTemp: 18, rain: 40,  sun: 9,  wind: 9,  uv: 7, humidity: 55, wave: 0.6, swim: false },
  { key: 'may', airHigh: 28, airLow: 15, seaTemp: 20, rain: 25,  sun: 11, wind: 8,  uv: 9, humidity: 50, wave: 0.4, swim: true },
  { key: 'jun', airHigh: 33, airLow: 19, seaTemp: 24, rain: 8,   sun: 13, wind: 8,  uv: 10, humidity: 40, wave: 0.3, swim: true },
  { key: 'jul', airHigh: 36, airLow: 22, seaTemp: 26, rain: 3,   sun: 14, wind: 9,  uv: 11, humidity: 35, wave: 0.2, swim: true },
  { key: 'aug', airHigh: 36, airLow: 22, seaTemp: 27, rain: 2,   sun: 13, wind: 8,  uv: 10, humidity: 38, wave: 0.3, swim: true },
  { key: 'sep', airHigh: 32, airLow: 18, seaTemp: 26, rain: 15,  sun: 11, wind: 7,  uv: 8, humidity: 45, wave: 0.4, swim: true },
  { key: 'oct', airHigh: 27, airLow: 14, seaTemp: 23, rain: 60,  sun: 8,  wind: 8,  uv: 5, humidity: 55, wave: 0.6, swim: true },
  { key: 'nov', airHigh: 21, airLow: 10, seaTemp: 20, rain: 120, sun: 6,  wind: 10, uv: 3, humidity: 65, wave: 1.0, swim: false },
  { key: 'dec', airHigh: 16, airLow: 7,  seaTemp: 18, rain: 190, sun: 5,  wind: 12, uv: 2, humidity: 70, wave: 0.8, swim: false },
];

const ACTIVITIES = [
  { key: 'boatTour',   icon: '⛵', months: [3,4,5,6,7,8,9,10],  color: 'bg-sky-100 text-sky-800' },
  { key: 'swimming',   icon: '🏊', months: [5,6,7,8,9,10],      color: 'bg-blue-100 text-blue-800' },
  { key: 'turtles',    icon: '🐢', months: [5,6,7,8,9,10],      color: 'bg-emerald-100 text-emerald-800' },
  { key: 'mudBath',    icon: '🧖', months: [1,2,3,4,5,6,7,8,9,10,11,12], color: 'bg-rose-100 text-rose-800' },
  { key: 'birdwatch',  icon: '🐦', months: [3,4,5,9,10,11],     color: 'bg-amber-100 text-amber-800' },
  { key: 'hiking',     icon: '🥾', months: [3,4,5,9,10,11],     color: 'bg-green-100 text-green-800' },
  { key: 'diving',     icon: '🤿', months: [5,6,7,8,9,10],      color: 'bg-indigo-100 text-indigo-800' },
  { key: 'cultural',   icon: '🏛️', months: [1,2,3,4,5,6,7,8,9,10,11,12], color: 'bg-orange-100 text-orange-800' },
];

export default function WeatherWidget() {
  const locale = useLocale();
  const t = (key: string) => getWeatherText(locale, key);
  const currentMonth = new Date().getMonth();
  const current = MONTHS[currentMonth];

  return (
    <div>
      {/* Current conditions card */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/* Air Temperature */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100 text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl md:text-3xl font-extrabold text-orange-600">{current.airHigh}°C</div>
          <div className="text-xs text-gray-500 mt-1">{t('airTemp')}</div>
          <div className="text-xs text-gray-400">↓ {current.airLow}°C</div>
        </div>

        {/* Sea Temperature */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-100 text-center">
          <div className="text-3xl mb-2">🌊</div>
          <div className="text-2xl md:text-3xl font-extrabold text-sky-600">{current.seaTemp}°C</div>
          <div className="text-xs text-gray-500 mt-1">{t('seaTemp')}</div>
          <div className={`text-xs mt-1 font-medium ${current.swim ? 'text-emerald-600' : 'text-gray-400'}`}>
            {current.swim ? '✅ ' + t('swimOk') : '❄️ ' + t('swimCold')}
          </div>
        </div>

        {/* Wind */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
          <div className="text-3xl mb-2">💨</div>
          <div className="text-2xl md:text-3xl font-extrabold text-gray-600">{current.wind} <span className="text-base font-normal">km/h</span></div>
          <div className="text-xs text-gray-500 mt-1">{t('wind')}</div>
          <div className="text-xs text-gray-400">{current.wind < 10 ? t('windCalm') : t('windModerate')}</div>
        </div>

        {/* Sunshine */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border border-yellow-100 text-center">
          <div className="text-3xl mb-2">{'\u2600\uFE0F'}</div>
          <div className="text-2xl md:text-3xl font-extrabold text-amber-600">{current.sun} <span className="text-base font-normal">h</span></div>
          <div className="text-xs text-gray-500 mt-1">{t('sunshine')}</div>
          <div className="text-xs text-gray-400">UV: {current.uv}/11</div>
        </div>

        {/* Wave Height */}
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-5 border border-cyan-100 text-center">
          <div className="text-3xl mb-2">{'\u{1F30A}'}</div>
          <div className="text-2xl md:text-3xl font-extrabold text-teal-600">{current.wave} <span className="text-base font-normal">m</span></div>
          <div className="text-xs text-gray-500 mt-1">{t('waveShort')}</div>
          <div className="text-xs text-gray-400">
            {current.wave <= 0.4 ? t('waveLow') : current.wave <= 0.8 ? t('waveModerate') : t('waveHigh')}
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 text-center">
          <div className="text-3xl mb-2">{'\u{1F4A7}'}</div>
          <div className="text-2xl md:text-3xl font-extrabold text-indigo-600">{current.humidity}<span className="text-base font-normal">%</span></div>
          <div className="text-xs text-gray-500 mt-1">{t('humidityShort')}</div>
          <div className="text-xs text-gray-400">
            {current.humidity <= 45 ? t('windCalm') : t('windModerate')}
          </div>
        </div>
      </div>

      {/* Monthly overview table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-700 to-sky-800 text-white">
                <th className="px-3 py-3 text-left font-semibold text-xs">{t('month')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">🌡️ {t('airShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">🌊 {t('seaShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">☀️ {t('sunShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">💨 {t('windShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">🌧️ {t('rainShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">{'\u{1F30A}'} {t('waveShort')}</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">{'\u{1F3CA}'} {t('swimShort')}</th>
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((m, i) => (
                <tr key={m.key} className={`border-b border-gray-50 ${i === currentMonth ? 'bg-amber-50 font-semibold' : i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                  <td className="px-3 py-2.5 font-medium text-gray-900">
                    {i === currentMonth && <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5" />}
                    {t(m.key)}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`font-bold ${m.airHigh >= 30 ? 'text-red-600' : m.airHigh >= 20 ? 'text-orange-600' : 'text-blue-600'}`}>{m.airHigh}°</span>
                    <span className="text-gray-400 text-xs"> / {m.airLow}°</span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`font-bold ${m.seaTemp >= 24 ? 'text-sky-600' : m.seaTemp >= 20 ? 'text-sky-500' : 'text-blue-400'}`}>{m.seaTemp}°</span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-amber-600">{m.sun}h</td>
                  <td className="px-3 py-2.5 text-center text-gray-600">{m.wind}</td>
                  <td className="px-3 py-2.5 text-center text-gray-500">{m.rain}mm</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`font-bold ${m.wave <= 0.4 ? 'text-teal-500' : m.wave <= 0.8 ? 'text-amber-500' : 'text-red-500'}`}>{m.wave}m</span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {m.swim
                      ? <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{'\u2713'}</span>
                      : <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full text-xs">{'\u2717'}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity recommendations */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('activitiesTitle')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACTIVITIES.map((act) => {
            const isAvailable = act.months.includes(currentMonth + 1);
            return (
              <div
                key={act.key}
                className={`rounded-xl p-4 text-center transition-all ${
                  isAvailable
                    ? `${act.color} shadow-sm`
                    : 'bg-gray-50 text-gray-400 opacity-60'
                }`}
              >
                <span className="text-2xl block mb-1">{act.icon}</span>
                <span className="text-xs font-semibold block">{t(act.key)}</span>
                {isAvailable && (
                  <span className="text-[10px] block mt-1 opacity-70">✓ {t('available')}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
