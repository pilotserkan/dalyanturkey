import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import PratikHubContent from './HubContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('pratikHub.title'),
    description: t('pratikHub.description'),
    alternates: {
      canonical: `https://dalyanturkey.com/${locale}/pratik`,
      languages: Object.fromEntries(locales.map(l => [l, `https://dalyanturkey.com/${l}/pratik`])),
    },
  };
}

export default function PratikPage() {
  return <PratikHubContent />;
}
