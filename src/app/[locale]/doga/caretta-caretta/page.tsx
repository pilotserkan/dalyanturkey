import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import PageContent from './PageContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('dogaCaretta.title'),
    description: t('dogaCaretta.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/doga/caretta-caretta`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/doga/caretta-caretta`])),
    },
  };
}

export default function CarettaCarettaPage() {
  return <PageContent />;
}
