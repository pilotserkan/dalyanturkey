import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import TarihHubContent from './HubContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('tarih.title'),
    description: t('tarih.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/tarih`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/tarih`])),
    },
  };
}

export default function TarihPage() {
  return <TarihHubContent />;
}
