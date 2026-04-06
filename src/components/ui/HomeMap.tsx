'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { POI_DATA, DALYAN_CENTER, type POI } from '@/lib/constants';

const CATEGORY_COLORS: Record<string, string> = {
  ancient: '#d97706',
  beaches: '#0ea5e9',
  nature: '#059669',
  wellness: '#e11d48',
  tours: '#6366f1',
  dining: '#ea580c',
  transport: '#64748b',
};

const CATEGORY_LABELS: Record<string, string> = {
  all: '🗺️ All',
  ancient: '🏛️ History',
  beaches: '🏖️ Beaches',
  nature: '🌿 Nature',
  wellness: '♨️ Wellness',
  tours: '⛵ Tours',
  dining: '🍽️ Dining',
};

type FilterCategory = 'all' | 'ancient' | 'beaches' | 'nature' | 'wellness' | 'tours' | 'dining';

export default function HomeMap() {
  const locale = useLocale();
  const nav = useTranslations('nav');
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById('home-interactive-map');
    if (!container || container.childNodes.length > 0) return;

    import('leaflet').then((L) => {
      const map = L.map('home-interactive-map', {
        scrollWheelZoom: false,
      }).setView([DALYAN_CENTER.lat, DALYAN_CENTER.lng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const markers: Record<string, L.Marker> = {};

      POI_DATA.forEach((poi) => {
        const color = CATEGORY_COLORS[poi.category] || '#666';
        const divIcon = L.divIcon({
          html: `<div style="font-size:22px;text-align:center;line-height:30px;width:30px;height:30px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid white;">${poi.icon}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          className: '',
        });

        let popupContent = `<div style="min-width:160px;font-family:system-ui,sans-serif;">`;
        popupContent += `<div style="font-size:20px;margin-bottom:4px;">${poi.icon}</div>`;
        popupContent += `<strong style="font-size:14px;">${getPoiName(poi, nav)}</strong>`;
        if (poi.pageSlug) {
          popupContent += `<br/><a href="/${locale}/${poi.pageSlug}" style="color:#0369a1;font-size:13px;text-decoration:underline;margin-top:4px;display:inline-block;">→ Details</a>`;
        }
        popupContent += `</div>`;

        const marker = L.marker([poi.lat, poi.lng], { icon: divIcon })
          .addTo(map)
          .bindPopup(popupContent);

        markers[poi.id] = marker;
      });

      // Store map and markers on window for filter updates
      (window as unknown as Record<string, unknown>).__dalyanMap = map;
      (window as unknown as Record<string, unknown>).__dalyanMarkers = markers;

      setMapLoaded(true);
    });
  }, [locale, nav]);

  // Apply filter
  useEffect(() => {
    if (!mapLoaded) return;
    const map = (window as unknown as Record<string, unknown>).__dalyanMap as L.Map | undefined;
    const markers = (window as unknown as Record<string, unknown>).__dalyanMarkers as Record<string, L.Marker> | undefined;
    if (!map || !markers) return;

    POI_DATA.forEach((poi) => {
      const marker = markers[poi.id];
      if (!marker) return;
      if (filter === 'all' || poi.category === filter) {
        marker.addTo(map);
      } else {
        marker.remove();
      }
    });
  }, [filter, mapLoaded]);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: CATEGORY_LABELS.all },
    { key: 'ancient', label: CATEGORY_LABELS.ancient },
    { key: 'beaches', label: CATEGORY_LABELS.beaches },
    { key: 'nature', label: CATEGORY_LABELS.nature },
    { key: 'wellness', label: CATEGORY_LABELS.wellness },
    { key: 'tours', label: CATEGORY_LABELS.tours },
    { key: 'dining', label: CATEGORY_LABELS.dining },
  ];

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? 'bg-sky-700 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div
        id="home-interactive-map"
        className="w-full h-[500px] md:h-[600px] rounded-2xl shadow-xl border border-gray-200"
        style={{ zIndex: 0 }}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm text-gray-600">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            {CATEGORY_LABELS[cat] || cat}
          </span>
        ))}
      </div>

      {/* Full Map Link */}
      <div className="text-center mt-6">
        <Link
          href={`/${locale}/harita`}
          className="inline-flex items-center gap-2 px-8 py-3 bg-sky-700 text-white font-semibold rounded-full hover:bg-sky-800 transition-colors shadow-lg hover:shadow-xl"
        >
          🗺️ Open Full Interactive Map
        </Link>
      </div>
    </div>
  );
}

function getPoiName(poi: POI, nav: ReturnType<typeof useTranslations>): string {
  // Try to get translated name from nav
  const slugMap: Record<string, string> = {
    'kaunos': 'kaunos',
    'rock-tombs': 'kaya-mezarlari',
    'iztuzu-beach': 'iztuzu-plaji',
    'ekincik-beach': 'ekincik-mavi-magara',
    'dekamer': 'caretta-caretta',
    'koycegiz-lake': 'koycegiz-golu',
    'dalyan-delta': 'dalyan-deltasi',
    'yuvarlakcay': 'yuvarlakcay',
    'sigla-forest': 'sigla-ormani',
    'sunset-point-iztuzu': 'gun-batimi-noktalari',
    'bird-watching-delta': 'kus-gozlemciligi',
    'mud-baths': 'camur-banyosu',
    'sultaniye-thermal': 'sultaniye-kaplicalari',
    'river-port': 'dalyan-tekne-turu',
    'iztuzu-water-taxi': 'iztuzu-su-taksi',
    'riverside-restaurants': 'mutfak',
    'dalaman-airport': 'havalimani',
    'koycegiz-town': 'pazar',
  };

  const navKey = slugMap[poi.id];
  if (navKey) {
    try {
      return nav(navKey);
    } catch {
      // fallback
    }
  }

  // Fallback: format ID nicely
  return poi.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
