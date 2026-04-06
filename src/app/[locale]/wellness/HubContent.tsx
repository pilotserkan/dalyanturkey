'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import HubCard from '@/components/ui/HubCard';
import { HUBS } from '@/lib/navigation';

export default function WellnessHubContent() {
  const t = useTranslations('wellness');
  const ct = useTranslations('common');
  const locale = useLocale();
  const hub = HUBS.wellness;

  return (
    <div>
      <PageHero
        title={t('hub.title')}
        subtitle={t('hub.subtitle')}
        backgroundImage="/images/dalyan-riverside.jpg"
        badge={t('hub.badge')}
        breadcrumbs={[
          { label: ct('nav.home'), href: `/${locale}` },
          { label: ct('nav.wellness'), href: `/${locale}/wellness` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">{t('hub.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hub.children.map((child) => {
            const cardKey = child.slug === 'sultaniye-kaplicalari' ? 'sultaniye' : 'camur';
            return (
              <HubCard
                key={child.slug}
                title={t(`hub.cards.${cardKey}.title`)}
                description={t(`hub.cards.${cardKey}.description`)}
                icon={child.icon}
                href={`/${locale}/wellness/${child.slug}`}
                color={hub.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
