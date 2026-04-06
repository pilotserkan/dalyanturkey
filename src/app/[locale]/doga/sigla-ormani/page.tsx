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
    title: t('dogaSigla.title'),
    description: t('dogaSigla.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/doga/sigla-ormani`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/doga/sigla-ormani`])),
    },
  };
}

export default function SiglaOrmaniPage() {
  return <PageContent />;
}
