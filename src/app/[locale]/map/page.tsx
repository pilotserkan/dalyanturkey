'use client';

import { useTranslations } from 'next-intl';
import InteractiveMap from '@/components/InteractiveMap';

export default function MapPage() {
  const t = useTranslations('map');

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-teal-700 text-white px-4 py-3 shadow-md flex-shrink-0">
        <h1 className="text-lg font-semibold">{t('title')}</h1>
      </header>
      <main className="flex-1 relative">
        <InteractiveMap fullPage={true} />
      </main>
    </div>
  );
}
