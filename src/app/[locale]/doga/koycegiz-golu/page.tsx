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
    title: t('dogaKoycegiz.title'),
    description: t('dogaKoycegiz.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/doga/koycegiz-golu`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/doga/koycegiz-golu`])),
    },
  };
}

export default function KoycegizGoluPage() {
  return <PageContent />;
}
