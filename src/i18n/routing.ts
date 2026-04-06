import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'de', 'ru', 'nl', 'fr', 'es', 'it', 'tr', 'ar', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
  nl: 'Nederlands',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  tr: 'Türkçe',
  ar: 'العربية',
  zh: '中文',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  ru: '🇷🇺',
  nl: '🇳🇱',
  fr: '🇫🇷',
  es: '🇪🇸',
  it: '🇮🇹',
  tr: '🇹🇷',
  ar: '🇸🇦',
  zh: '🇨🇳',
};
