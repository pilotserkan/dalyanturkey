import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load multiple JSON files from per-locale directories and merge them
  const common = (await import(`./messages/${locale}/common.json`)).default;
  const home = (await import(`./messages/${locale}/home.json`)).default;
  const tarih = (await import(`./messages/${locale}/tarih.json`)).default;
  const doga = (await import(`./messages/${locale}/doga.json`)).default;
  const wellness = (await import(`./messages/${locale}/wellness.json`)).default;
  const turlar = (await import(`./messages/${locale}/turlar.json`)).default;
  const yemeIcme = (await import(`./messages/${locale}/yeme-icme.json`)).default;
  const pratik = (await import(`./messages/${locale}/pratik.json`)).default;
  const harita = (await import(`./messages/${locale}/harita.json`)).default;
  const hakkinda = (await import(`./messages/${locale}/hakkinda.json`)).default;

  return {
    locale,
    messages: { ...common, ...home, ...tarih, ...doga, ...wellness, ...turlar, ...yemeIcme, ...pratik, ...harita, ...hakkinda },
  };
});
