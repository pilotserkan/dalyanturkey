import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import MapPageContent from './MapPageContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('harita.title'),
    description: t('harita.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/harita`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/harita`])),
    },
  };
}

export default function HaritaPage() {
  return <MapPageContent />;
}
