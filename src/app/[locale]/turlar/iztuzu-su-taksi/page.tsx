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
    title: t('turlarSuTaksi.title'),
    description: t('turlarSuTaksi.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/turlar/iztuzu-su-taksi`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/turlar/iztuzu-su-taksi`])),
    },
  };
}

export default function IztuzuSuTaksiPage() {
  return <PageContent />;
}
