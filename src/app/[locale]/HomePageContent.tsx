'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import HubCard from '@/components/ui/HubCard';
import HomeMap from '@/components/ui/HomeMap';
import { HUBS, HUB_ORDER } from '@/lib/navigation';

const stats = [
  { key: 'years', icon: '\u{1F3DB}\uFE0F' },
  { key: 'species', icon: '\u{1F422}' },
  { key: 'river', icon: '\u{1F30A}' },
  { key: 'sun', icon: '\u2600\uFE0F' },
];

const testimonials = [
  { key: '1', avatar: 'SM' },
  { key: '2', avatar: 'HW' },
  { key: '3', avatar: 'ML' },
];

export default function HomePageContent() {
  const hero = useTranslations('hero');
  const t = useTranslations('home');
  const nav = useTranslations('nav');
  const locale = useLocale();

  return (
    <div>
      {/* Full-screen Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/rock-tombs-reflection.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="gradient-overlay" aria-hidden="true" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            {hero('title')}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-4 animate-fade-in-up">
            {hero('subtitle')}
          </p>
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            {hero('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <a
              href="#hubs"
              className="inline-flex items-center px-8 py-4 bg-white text-sky-800 font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-lg"
            >
              {hero('exploreCta')}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              href={`/${locale}/tarih`}
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
            >
              {hero('discoverCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Hub Cards Grid */}
      <section id="hubs" className="relative py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('hubs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('hubs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HUB_ORDER.map((hubSlug) => {
              const hub = HUBS[hubSlug];
              return (
                <HubCard
                  key={hubSlug}
                  title={nav(hub.translationKey.replace('nav.', ''))}
                  description=""
                  icon={hub.icon}
                  href={`/${locale}/${hub.slug}`}
                  color={hub.color}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-b from-sky-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('stats.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-extrabold text-sky-700 mb-2">
                  {t(`stats.${stat.key}.value`)}
                </div>
                <div className="text-gray-600 font-medium">
                  {t(`stats.${stat.key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.key}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{t(`testimonials.${testimonial.key}.quote`)}&rdquo;
                </blockquote>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {t(`testimonials.${testimonial.key}.name`)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t(`testimonials.${testimonial.key}.location`)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              🗺️ Interactive Map
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Dalyan&apos;s Attractions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any marker to discover more about each location and navigate to its dedicated page.
            </p>
          </div>
          <HomeMap />
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/harita`}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-700 transition-all shadow-sm"
            >
              &#x1F5FA;&#xFE0F; {nav('harita')}
            </Link>
            <Link
              href={`/${locale}/hakkinda/dalyan-nerede`}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-700 transition-all shadow-sm"
            >
              &#x1F4CD; {nav('hakkinda')}
            </Link>
            <Link
              href={`/${locale}/pratik/sik-sorulan-sorular`}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-700 transition-all shadow-sm"
            >
              &#x2753; {nav('sss')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
