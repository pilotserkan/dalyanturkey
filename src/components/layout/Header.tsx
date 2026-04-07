'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { HUBS, HUB_ORDER, STANDALONE_PAGES } from '@/lib/navigation';
import LanguageSwitcher from './LanguageSwitcher';

// ---------------------------------------------------------------------------
// Map slugs from navigation.ts to camelCase keys in common.json nav section
// ---------------------------------------------------------------------------
const SLUG_TO_NAV_KEY: Record<string, string> = {
  // Hubs
  tarih: 'tarih',
  doga: 'doga',
  wellness: 'wellness',
  turlar: 'turlar',
  'yeme-icme': 'yemeIcme',
  pratik: 'pratik',
  // Standalone
  harita: 'harita',
  'hakkinda/dalyan-nerede': 'hakkinda',
  // History children
  'kaunos-antik-kenti': 'kaunos',
  'kaya-mezarlari': 'kayaMezarlari',
  // Nature children
  'iztuzu-plaji': 'iztuzu',
  'caretta-caretta': 'caretta',
  'koycegiz-golu': 'koycegiz',
  'dalyan-deltasi': 'delta',
  'mavi-yengec': 'maviYengec',
  'kus-gozlemciligi': 'kusGozlem',
  yuvarlakcay: 'yuvarlakcay',
  'sigla-ormani': 'sigla',
  'gun-batimi-noktalari': 'gunBatimi',
  // Wellness children
  'sultaniye-kaplicalari': 'sultaniye',
  'camur-banyosu': 'camurBanyosu',
  // Tours children
  'dalyan-tekne-turu': 'tekneTuru',
  'kaunos-kultur-turu': 'kaunosKultur',
  'iztuzu-su-taksi': 'suTaksi',
  'caretta-izleme-turu': 'carettaTuru',
  'wellness-turu': 'wellnessTuru',
  'jeep-safari': 'jeepSafari',
  'ekincik-mavi-magara': 'ekincik',
  'saklikent-tlos-turu': 'saklikent',
  'gunubirlik-geziler': 'gunubirlik',
  // Food children
  'dalyan-mutfagi': 'mutfak',
  // Practical children
  'dalaman-havalimanindan-dalyan': 'havalimani',
  'ne-zaman-gidilir': 'neZaman',
  'koycegiz-pazari': 'pazar',
  'sik-sorulan-sorular': 'sss',
  'surdurulebilir-turizm': 'surdurulebilir',
};

function navKey(slug: string): string {
  return SLUG_TO_NAV_KEY[slug] ?? slug;
}

// ---------------------------------------------------------------------------
// Accent colors per hub (used for dropdown top-border accent)
// ---------------------------------------------------------------------------
const HUB_ACCENT: Record<string, string> = {
  tarih: 'border-t-amber-500',
  doga: 'border-t-emerald-500',
  wellness: 'border-t-rose-500',
  turlar: 'border-t-sky-500',
  'yeme-icme': 'border-t-orange-500',
  pratik: 'border-t-slate-500',
};

const HUB_HOVER_COLOR: Record<string, string> = {
  tarih: 'hover:text-amber-600',
  doga: 'hover:text-emerald-600',
  wellness: 'hover:text-rose-600',
  turlar: 'hover:text-sky-600',
  'yeme-icme': 'hover:text-orange-600',
  pratik: 'hover:text-slate-600',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedHub, setExpandedHub] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Desktop dropdown hover handlers with delay
  const openDropdown = useCallback((slug: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(slug);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Mobile accordion toggle
  const toggleMobileHub = (slug: string) => {
    setExpandedHub((prev) => (prev === slug ? null : slug));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setExpandedHub(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-800'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ---- Logo ---- */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-xl lg:text-2xl shrink-0"
          >
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
              <path d="M8 20 Q16 8 24 20" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="16" cy="14" r="3" fill="currentColor" />
            </svg>
            <span>
              Dalyan
              <span className={isScrolled ? 'text-sky-600' : 'text-amber-300'}>Turkey</span>
            </span>
          </Link>

          {/* ---- Desktop Nav ---- */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {HUB_ORDER.map((hubSlug) => {
              const hub = HUBS[hubSlug];
              return (
                <div
                  key={hubSlug}
                  className="relative"
                  onMouseEnter={() => openDropdown(hubSlug)}
                  onMouseLeave={closeDropdown}
                >
                  {/* Hub trigger */}
                  <Link
                    href={`/${locale}/${hub.slug}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                      isScrolled ? 'hover:bg-gray-100 hover:text-gray-900' : 'hover:bg-white/10'
                    } ${activeDropdown === hubSlug ? (isScrolled ? 'bg-gray-100' : 'bg-white/10') : ''}`}
                  >
                    {t(navKey(hub.slug))}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === hubSlug ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>

                  {/* Mega-menu dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                      activeDropdown === hubSlug
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div
                      className={`bg-white rounded-xl shadow-2xl border border-gray-100 border-t-2 ${
                        HUB_ACCENT[hubSlug] ?? 'border-t-gray-400'
                      } py-2 min-w-[220px] ${hub.children.length > 5 ? 'columns-2 gap-0' : ''}`}
                    >
                      {/* Hub index link */}
                      <Link
                        href={`/${locale}/${hub.slug}`}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 ${HUB_HOVER_COLOR[hubSlug] ?? 'hover:text-gray-900'} transition-colors font-semibold border-b border-gray-100 break-inside-avoid`}
                      >
                        <span>{hub.icon}</span>
                        {t(navKey(hub.slug))}
                      </Link>
                      {hub.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/${locale}/${hub.slug}/${child.slug}`}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 ${HUB_HOVER_COLOR[hubSlug] ?? 'hover:text-gray-900'} transition-colors break-inside-avoid`}
                        >
                          <span className="text-base">{child.icon}</span>
                          {t(navKey(child.slug))}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Standalone links */}
            {STANDALONE_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/${locale}/${page.slug}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled ? 'hover:bg-gray-100 hover:text-gray-900' : 'hover:bg-white/10'
                }`}
              >
                {t(navKey(page.slug))}
              </Link>
            ))}
          </nav>

          {/* ---- Right side ---- */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---- Mobile Drawer ---- */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 lg:hidden z-[60] ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col z-[70] ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href={`/${locale}`} onClick={closeMobile} className="font-bold text-xl text-gray-900">
            Dalyan<span className="text-sky-600">Turkey</span>
          </Link>
          <button
            onClick={closeMobile}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Home link */}
          <Link
            href={`/${locale}`}
            onClick={closeMobile}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            <span className="text-lg">&#x1F3E0;</span>
            {t('home')}
          </Link>

          {/* Hub accordions */}
          {HUB_ORDER.map((hubSlug) => {
            const hub = HUBS[hubSlug];
            const isExpanded = expandedHub === hubSlug;

            return (
              <div key={hubSlug} className="mt-1">
                {/* Hub header row */}
                <div className="flex items-center">
                  <Link
                    href={`/${locale}/${hub.slug}`}
                    onClick={closeMobile}
                    className="flex-1 flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    <span className="text-lg">{hub.icon}</span>
                    {t(navKey(hub.slug))}
                  </Link>
                  <button
                    onClick={() => toggleMobileHub(hubSlug)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    aria-label={`Expand ${t(navKey(hub.slug))}`}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Accordion children */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-6 border-l-2 border-gray-100 pl-3 pb-2">
                    {hub.children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/${locale}/${hub.slug}/${child.slug}`}
                        onClick={closeMobile}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <span>{child.icon}</span>
                        {t(navKey(child.slug))}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Standalone links */}
          <div className="mt-2 pt-2 border-t border-gray-100">
            {STANDALONE_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/${locale}/${page.slug}`}
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                <span className="text-lg">{page.icon}</span>
                {t(navKey(page.slug))}
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer - language switcher */}
        <div className="border-t border-gray-100 px-5 py-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
