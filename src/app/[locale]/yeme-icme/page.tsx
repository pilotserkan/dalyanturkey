import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import YemeIcmeHubContent from './HubContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('yemeIcmeHub.title'),
    description: t('yemeIcmeHub.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/yeme-icme`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/yeme-icme`])),
    },
  };
}

export default function YemeIcmePage() {
  return <YemeIcmeHubContent />;
}
