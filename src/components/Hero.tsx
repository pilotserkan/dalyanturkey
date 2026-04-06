'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video / Image Placeholder */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/rock-tombs-river-night.jpg')`,
          }}
        />
        <div className="gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <div className="animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-amber-500/90 text-white text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            dalyanturkey.com
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-shadow-lg animate-fade-in-up animate-delay-100">
          {t('title')}
        </h1>

        <p className="text-2xl md:text-3xl font-light mb-6 text-amber-200 text-shadow animate-fade-in-up animate-delay-200">
          {t('subtitle')}
        </p>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200 leading-relaxed animate-fade-in-up animate-delay-300">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
          <Link href={`/${locale}/boat-tours`} className="btn-primary text-lg px-8 py-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {t('exploreTours')}
          </Link>
          <Link href={`/${locale}/ancient-sites`} className="btn-secondary text-lg px-8 py-4">
            {t('discoverHistory')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
