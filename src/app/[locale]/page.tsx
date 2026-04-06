'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Hero from '@/components/Hero';
import InteractiveMap from '@/components/InteractiveMap';

const features = [
  { key: 'ancientSites', emoji: '🏛️', href: '/ancient-sites', gradient: 'from-amber-500 to-orange-600' },
  { key: 'boatTours', emoji: '⛵', href: '/boat-tours', gradient: 'from-sky-500 to-blue-600' },
  { key: 'iztuzu', emoji: '🐢', href: '/iztuzu-beach', gradient: 'from-emerald-500 to-teal-600' },
  { key: 'mudBaths', emoji: '♨️', href: '/mud-baths', gradient: 'from-rose-500 to-pink-600' },
];

const stats = [
  { key: 'years', icon: '🏛️' },
  { key: 'species', icon: '🐢' },
  { key: 'river', icon: '🌊' },
  { key: 'sun', icon: '☀️' },
];

const testimonials = [
  { key: '1', avatar: 'JM' },
  { key: '2', avatar: 'SK' },
  { key: '3', avatar: 'AL' },
];

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Discover Dalyan Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              {t('discover.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('discover.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('discover.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.key}
                href={`/${locale}${feature.href}`}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                    {t(`discover.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                    {t(`discover.${feature.key}.description`)}
                  </p>
                  <div className="mt-6 flex items-center text-sky-600 group-hover:text-white font-semibold transition-colors duration-300">
                    {t('discover.learnMore')}
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Dalyan Section */}
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

      {/* Interactive Map Preview */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              {t('map.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t('map.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('map.subtitle')}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <InteractiveMap fullPage={false} />
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/map`}
              className="inline-flex items-center px-8 py-4 bg-sky-700 text-white font-semibold rounded-full hover:bg-sky-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t('map.viewFull')}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              {t('testimonials.badge')}
            </span>
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
    </div>
  );
}
