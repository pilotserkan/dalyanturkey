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
    title: t('turlarWellness.title'),
    description: t('turlarWellness.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/turlar/wellness-turu`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/turlar/wellness-turu`])),
    },
  };
}

export default function WellnessTuruPage() {
  return <PageContent />;
}
