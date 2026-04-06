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
    title: t('yemeIcmeMutfak.title'),
    description: t('yemeIcmeMutfak.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/yeme-icme/dalyan-mutfagi`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/yeme-icme/dalyan-mutfagi`])),
    },
  };
}

export default function DalyanMutfagiPage() {
  return <PageContent />;
}
