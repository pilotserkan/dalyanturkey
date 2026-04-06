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
    title: t('turlarSaklikent.title'),
    description: t('turlarSaklikent.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/turlar/saklikent-tlos-turu`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/turlar/saklikent-tlos-turu`])),
    },
  };
}

export default function SaklikentTlosTuruPage() {
  return <PageContent />;
}
