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
    title: t('tarihKaunos.title'),
    description: t('tarihKaunos.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/tarih/kaunos-antik-kenti`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/tarih/kaunos-antik-kenti`])),
    },
  };
}

export default function KaunosAntikKentiPage() {
  return <PageContent />;
}
