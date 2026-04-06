'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const DALYAN_CENTER = { lat: 36.8333, lng: 28.6333 };

const POI_DATA = [
  { id: 'kaunos', lat: 36.8267, lng: 28.6189, category: 'ancient', icon: '🏛️' },
  { id: 'rockTombs', lat: 36.8350, lng: 28.6280, category: 'ancient', icon: '⛰️' },
  { id: 'iztuzu', lat: 36.7900, lng: 28.5950, category: 'beaches', icon: '🏖️' },
  { id: 'mudBaths', lat: 36.8400, lng: 28.6350, category: 'nature', icon: '♨️' },
  { id: 'thermalSprings', lat: 36.8420, lng: 28.6370, category: 'nature', icon: '🌊' },
  { id: 'townCenter', lat: 36.8333, lng: 28.6333, category: 'tours', icon: '📍' },
  { id: 'riverPort', lat: 36.8340, lng: 28.6310, category: 'tours', icon: '⛵' },
  { id: 'lake', lat: 36.8700, lng: 28.6800, category: 'nature', icon: '🌅' },
  { id: 'canal', lat: 36.8150, lng: 28.6100, category: 'nature', icon: '🚣' },
];

type FilterCategory = 'all' | 'ancient' | 'beaches' | 'tours' | 'nature';

export default function InteractiveMap({ fullPage = false }: { fullPage?: boolean }) {
  const t = useTranslations('map');
  const [filter, setFilter] = useState<FilterCategory>('all');
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      const containerId = fullPage ? 'dalyan-map-full' : 'dalyan-map-mini';
      const container = document.getElementById(containerId);
      if (!container || container.hasChildNodes()) return;

      const map = L.map(containerId).setView([DALYAN_CENTER.lat, DALYAN_CENTER.lng], fullPage ? 13 : 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      POI_DATA.forEach((poi) => {
        const divIcon = L.divIcon({
          html: `<div style="font-size:24px;text-align:center;line-height:32px;">${poi.icon}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          className: '',
        });

        const locationName = t(`locations.${poi.id}` as Parameters<typeof t>[0]);
        L.marker([poi.lat, poi.lng], { icon: divIcon })
          .addTo(map)
          .bindPopup(`<strong>${locationName}</strong>`);
      });

      return () => {
        map.remove();
      };
    });
  }, [fullPage, t]);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t('filters.all') },
    { key: 'ancient', label: t('filters.ancient') },
    { key: 'beaches', label: t('filters.beaches') },
    { key: 'tours', label: t('filters.tours') },
    { key: 'nature', label: t('filters.nature') },
  ];

  return (
    <div className={fullPage ? 'flex flex-col h-[calc(100vh-80px)]' : ''}>
      {fullPage && (
        <div className="flex flex-wrap gap-2 p-4 bg-white border-b">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-sky-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div
        id={fullPage ? 'dalyan-map-full' : 'dalyan-map-mini'}
        className={`w-full ${fullPage ? 'flex-1' : 'h-[600px] rounded-2xl'}`}
        style={{ zIndex: 0 }}
      />
    </div>
  );
}
