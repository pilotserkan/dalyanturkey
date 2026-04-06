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
    title: t('pratikPazar.title'),
    description: t('pratikPazar.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/pratik/koycegiz-pazari`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/pratik/koycegiz-pazari`])),
    },
  };
}

export default function KoycegizPazariPage() {
  return <PageContent />;
}
