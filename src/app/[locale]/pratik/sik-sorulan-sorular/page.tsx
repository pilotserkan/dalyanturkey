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
    title: t('pratikSSS.title'),
    description: t('pratikSSS.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/pratik/sik-sorulan-sorular`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/pratik/sik-sorulan-sorular`])),
    },
  };
}

export default function SSSPage() {
  return <PageContent />;
}
