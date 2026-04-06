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
    title: t('wellnessSultaniye.title'),
    description: t('wellnessSultaniye.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/wellness/sultaniye-kaplicalari`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/wellness/sultaniye-kaplicalari`])),
    },
  };
}

export default function SultaniyeKaplicalariPage() {
  return <PageContent />;
}
