'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import HubCard from '@/components/ui/HubCard';
import { HUBS } from '@/lib/navigation';

export default function PratikHubContent() {
  const t = useTranslations('pratik');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const hub = HUBS.pratik;

  const cardKeys: Record<string, string> = {
    'dalaman-havalimanindan-dalyan': 'airport',
    'ne-zaman-gidilir': 'bestTime',
    'koycegiz-pazari': 'market',
    'sik-sorulan-sorular': 'faq',
    'surdurulebilir-turizm': 'sustainability',
  };

  return (
    <div>
      <PageHero
        title={t('hub.title')}
        subtitle={t('hub.subtitle')}
        backgroundImage="/images/dalyan-town-night.jpg"
        badge={t('hub.badge')}
        breadcrumbs={[
          { label: nav('home'), href: `/${locale}` },
          { label: nav('pratik'), href: `/${locale}/pratik` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">{t('hub.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hub.children.map((child) => {
            const cardKey = cardKeys[child.slug] || child.slug;
            return (
              <HubCard
                key={child.slug}
                title={t(`hub.cards.${cardKey}.title`)}
                description={t(`hub.cards.${cardKey}.description`)}
                icon={child.icon}
                href={`/${locale}/pratik/${child.slug}`}
                color={hub.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
