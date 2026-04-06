import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import DogaHubContent from './HubContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('dogaHub.title'),
    description: t('dogaHub.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/doga`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/doga`])),
    },
  };
}

export default function DogaPage() {
  return <DogaHubContent />;
}
