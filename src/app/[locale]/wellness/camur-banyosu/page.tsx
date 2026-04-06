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
    title: t('wellnessCamur.title'),
    description: t('wellnessCamur.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/wellness/camur-banyosu`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/wellness/camur-banyosu`])),
    },
  };
}

export default function CamurBanyosuPage() {
  return <PageContent />;
}
