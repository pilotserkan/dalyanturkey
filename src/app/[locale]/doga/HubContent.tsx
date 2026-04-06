'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import HubCard from '@/components/ui/HubCard';
import { HUBS } from '@/lib/navigation';

export default function DogaHubContent() {
  const t = useTranslations('doga');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const hub = HUBS.doga;

  return (
    <div>
      <PageHero
        title={t('hub.title')}
        subtitle={t('hub.subtitle')}
        backgroundImage="/images/dalyan-mountain.jpg"
        badge={t('hub.badge')}
        breadcrumbs={[
          { label: nav('home'), href: `/${locale}` },
          { label: nav('doga'), href: `/${locale}/doga` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hub.children.map((child) => (
            <HubCard
              key={child.slug}
              title={nav(child.translationKey.replace('nav.', ''))}
              description=""
              icon={child.icon}
              href={`/${locale}/doga/${child.slug}`}
              color={hub.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
