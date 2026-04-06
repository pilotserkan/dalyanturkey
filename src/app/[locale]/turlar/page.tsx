import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import TurlarHubContent from './HubContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('turlarHub.title'),
    description: t('turlarHub.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/turlar`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/turlar`])),
    },
  };
}

export default function TurlarPage() {
  return <TurlarHubContent />;
}
