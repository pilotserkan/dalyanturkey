'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';
import HubCard from '@/components/ui/HubCard';
import { HUBS } from '@/lib/navigation';

export default function TarihHubContent() {
  const t = useTranslations('tarih');
  const ct = useTranslations('common');
  const locale = useLocale();
  const hub = HUBS.tarih;

  return (
    <div>
      <PageHero
        title={t('hub.title')}
        subtitle={t('hub.subtitle')}
        backgroundImage="/images/rock-tombs-river-night.jpg"
        badge={t('hub.badge')}
        breadcrumbs={[
          { label: ct('nav.home'), href: `/${locale}` },
          { label: ct('nav.tarih'), href: `/${locale}/tarih` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hub.children.map((child) => (
            <HubCard
              key={child.slug}
              title={ct(child.translationKey)}
              description=""
              icon={child.icon}
              href={`/${locale}/tarih/${child.slug}`}
              color={hub.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
