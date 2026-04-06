'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import HubCard from '@/components/ui/HubCard';
import { HUBS } from '@/lib/navigation';

export default function TurlarHubContent() {
  const t = useTranslations('turlar');
  const ct = useTranslations('common');
  const locale = useLocale();
  const hub = HUBS.turlar;

  return (
    <div>
      <PageHero
        title={t('hub.title')}
        subtitle={t('hub.subtitle')}
        backgroundImage="/images/dalyan-river-boats.jpg"
        badge={t('hub.badge')}
        breadcrumbs={[
          { label: ct('nav.home'), href: `/${locale}` },
          { label: ct('nav.turlar'), href: `/${locale}/turlar` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">{t('hub.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hub.children.map((child) => (
            <HubCard
              key={child.slug}
              title={ct(child.translationKey)}
              description=""
              icon={child.icon}
              href={`/${locale}/turlar/${child.slug}`}
              color={hub.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
