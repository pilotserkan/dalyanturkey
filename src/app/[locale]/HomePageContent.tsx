'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import HomeMap from '@/components/ui/HomeMap';
import WeatherWidget from '@/components/ui/WeatherWidget';
import { getWeatherText } from '@/lib/weather-i18n';
import { HUBS, HUB_ORDER } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HUB_ICONS: Record<string, { emoji: string; gradient: string; ring: string }> = {
  tarih:      { emoji: '\u{1F3DB}\uFE0F', gradient: 'from-amber-500 to-orange-600',   ring: 'ring-amber-400' },
  doga:       { emoji: '\u{1F331}',        gradient: 'from-emerald-500 to-teal-600',   ring: 'ring-emerald-400' },
  wellness:   { emoji: '\u2728',           gradient: 'from-rose-500 to-pink-600',      ring: 'ring-rose-400' },
  turlar:     { emoji: '\u26F5',           gradient: 'from-sky-500 to-blue-600',       ring: 'ring-sky-400' },
  'yeme-icme':{ emoji: '\u{1F37D}\uFE0F', gradient: 'from-orange-500 to-red-500',     ring: 'ring-orange-400' },
  pratik:     { emoji: '\u{1F4CD}',        gradient: 'from-slate-500 to-gray-600',     ring: 'ring-slate-400' },
};

const STATS = [
  { key: 'years',   icon: '\u{1F3DB}\uFE0F', color: 'text-amber-600' },
  { key: 'species', icon: '\u{1F426}',        color: 'text-emerald-600' },
  { key: 'river',   icon: '\u{1F30A}',        color: 'text-sky-600' },
  { key: 'sun',     icon: '\u2600\uFE0F',     color: 'text-orange-500' },
  { key: 'turtles', icon: '\u{1F422}',        color: 'text-teal-600' },
  { key: 'airport', icon: '\u2708\uFE0F',     color: 'text-indigo-600' },
];

const TIMELINE = ['morning', 'midMorning', 'noon', 'afternoon', 'evening', 'night'] as const;
const TIMELINE_COLORS = [
  'border-amber-400 bg-amber-50',
  'border-sky-400 bg-sky-50',
  'border-rose-400 bg-rose-50',
  'border-teal-400 bg-teal-50',
  'border-orange-400 bg-orange-50',
  'border-indigo-400 bg-indigo-50',
];

const TESTIMONIALS = [
  { key: '1', avatar: 'SM', gradient: 'from-sky-400 to-blue-600' },
  { key: '2', avatar: 'HW', gradient: 'from-amber-400 to-orange-600' },
  { key: '3', avatar: 'ML', gradient: 'from-emerald-400 to-teal-600' },
];

const FEATURED = [
  { key: 'kaunos',    href: 'tarih/kaunos-antik-kenti', img: '/images/rock-tombs-night.jpg',       accent: 'amber' },
  { key: 'rockTombs', href: 'tarih/kaya-mezarlari',     img: '/images/rock-tombs-reflection.jpg',  accent: 'orange' },
  { key: 'iztuzu',    href: 'doga/iztuzu-plaji',        img: '/images/dalyan-river-boats.jpg',     accent: 'teal' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HomePageContent() {
  const hero = useTranslations('hero');
  const t    = useTranslations('home');
  const nav  = useTranslations('nav');
  const locale = useLocale();
  const w = (key: string) => getWeatherText(locale, key);

  return (
    <div className="overflow-x-hidden">

      {/* ============================================================ */}
      {/*  HERO — fullscreen with parallax-feel                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/rock-tombs-river-night.jpg)' }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Badge */}
          <span className="inline-block px-5 py-2 bg-amber-500/90 text-white text-sm font-bold rounded-full mb-8 tracking-widest uppercase shadow-lg animate-fade-in">
            dalyanturkey.com
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-6 leading-[1.1] animate-fade-in-up" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            {hero('title')}
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-amber-200 mb-4 sm:mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', animationDelay: '0.15s' }}>
            {hero('subtitle')}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {hero('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up px-4" style={{ animationDelay: '0.45s' }}>
            <a href="#highlights" className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg">
              {hero('exploreCta')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link href={`/${locale}/tarih`} className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-10 sm:py-5 bg-white/15 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300 text-base sm:text-lg">
              {hero('discoverCta')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs uppercase tracking-widest">{hero('scrollDown')}</span>
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HIGHLIGHTS — 4 pillars of Dalyan                             */}
      {/* ============================================================ */}
      <section id="highlights" className="relative py-24 bg-white overflow-hidden">
        {/* Decorative top wave */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('highlights.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t('highlights.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t('highlights.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* History */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-10 border border-amber-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700" />
              <span className="text-5xl mb-4 block">{'\u{1F3DB}\uFE0F'}</span>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">{t('highlights.history.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('highlights.history.text')}</p>
              <Link href={`/${locale}/tarih`} className="inline-flex items-center gap-1 mt-4 text-amber-700 font-semibold hover:text-amber-900 transition-colors">
                {nav('tarih')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Nature */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:p-10 border border-emerald-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700" />
              <span className="text-5xl mb-4 block">{'\u{1F422}'}</span>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">{t('highlights.nature.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('highlights.nature.text')}</p>
              <Link href={`/${locale}/doga`} className="inline-flex items-center gap-1 mt-4 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors">
                {nav('doga')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Wellness */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 p-8 md:p-10 border border-rose-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700" />
              <span className="text-5xl mb-4 block">{'\u2728'}</span>
              <h3 className="text-2xl font-bold text-rose-900 mb-3">{t('highlights.wellness.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('highlights.wellness.text')}</p>
              <Link href={`/${locale}/wellness`} className="inline-flex items-center gap-1 mt-4 text-rose-700 font-semibold hover:text-rose-900 transition-colors">
                {nav('wellness')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Cuisine */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 p-8 md:p-10 border border-orange-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700" />
              <span className="text-5xl mb-4 block">{'\u{1F37D}\uFE0F'}</span>
              <h3 className="text-2xl font-bold text-orange-900 mb-3">{t('highlights.cuisine.title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('highlights.cuisine.text')}</p>
              <Link href={`/${locale}/yeme-icme`} className="inline-flex items-center gap-1 mt-4 text-orange-700 font-semibold hover:text-orange-900 transition-colors">
                {nav('yeme-icme')} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WEATHER & ACTIVITIES                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {w('badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {w('title')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {w('subtitle')}
            </p>
          </div>
          <WeatherWidget />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTIVE MAP                                              */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('map.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {t('map.title')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t('map.subtitle')}
            </p>
          </div>
          <HomeMap />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED — 3 hero attractions with images                    */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('featured.badge')}
            </span>
          </div>

          <div className="space-y-16">
            {FEATURED.map((item, i) => (
              <Link key={item.key} href={`/${locale}/${item.href}`} className="group block">
                <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                  {/* Image */}
                  <div className="lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                    <div className="aspect-[16/10] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${item.img})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* Text */}
                  <div className="lg:w-1/2 py-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-sky-700 transition-colors">
                      {t(`featured.${item.key}.title`)}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {t(`featured.${item.key}.text`)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sky-600 font-semibold text-lg group-hover:gap-3 transition-all">
                      Explore <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HUB CARDS — 6 curated sections                               */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('hubs.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t('hubs.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t('hubs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HUB_ORDER.map((hubSlug) => {
              const hub = HUBS[hubSlug];
              const style = HUB_ICONS[hubSlug] || HUB_ICONS.pratik;
              return (
                <Link key={hubSlug} href={`/${locale}/${hub.slug}`} className="group">
                  <div className={`relative rounded-2xl p-8 bg-white border-2 border-transparent hover:border-current shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                    {/* Gradient circle bg */}
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${style.gradient} opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700`} />

                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {style.emoji}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition-colors">
                      {nav(hub.translationKey.replace('nav.', ''))}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4">
                      {hub.children.length} {hub.children.length === 1 ? 'page' : 'pages'}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 group-hover:gap-2 transition-all">
                      Explore <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS — 6 numbers                                           */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-sky-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t('stats.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t('stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat) => (
              <div key={stat.key} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className={`text-2xl md:text-3xl font-extrabold ${stat.color} mb-1`}>
                  {t(`stats.${stat.key}.value`)}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">
                  {t(`stats.${stat.key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EXPERIENCE TIMELINE                                          */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('experience.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t('experience.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-sky-300 to-indigo-300" />

            <div className="space-y-8">
              {TIMELINE.map((slot, i) => (
                <div key={slot} className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Time bubble */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg border-4 border-sky-200 flex items-center justify-center z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-xs font-bold text-sky-700">{t(`experience.${slot}.time`)}</span>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 ml-6 md:ml-0 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'} md:w-1/2`}>
                    <div className={`rounded-2xl p-6 border-l-4 ${TIMELINE_COLORS[i]} shadow-md hover:shadow-lg transition-shadow`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {t(`experience.${slot}.title`)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t(`experience.${slot}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-bold rounded-full mb-4 tracking-wide uppercase">
              {t('testimonials.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <article key={item.key} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic text-lg">
                  &ldquo;{t(`testimonials.${item.key}.quote`)}&rdquo;
                </blockquote>

                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {item.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{t(`testimonials.${item.key}.name`)}</div>
                    <div className="text-sm text-gray-500">{t(`testimonials.${item.key}.location`)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA — Final call to action                                   */}
      {/* ============================================================ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/dalyan-town-night.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 to-sky-800/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            {t('cta.title')}
          </h2>
          <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/pratik/dalaman-havalimanindan-dalyan`} className="inline-flex items-center gap-2 px-6 py-3 sm:px-10 sm:py-5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all text-lg">
              {t('cta.plan')}
            </Link>
            <Link href={`/${locale}/harita`} className="inline-flex items-center gap-2 px-6 py-3 sm:px-10 sm:py-5 bg-white/15 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white/25 transition-all text-lg">
              {t('cta.map')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
