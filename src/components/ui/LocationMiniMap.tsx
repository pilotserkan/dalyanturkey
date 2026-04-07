'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface LocationMiniMapProps {
  lat: number;
  lng: number;
  title: string;
  icon?: string;
  zoom?: number;
}

export default function LocationMiniMap({ lat, lng, title, icon = '📍', zoom = 14 }: LocationMiniMapProps) {
  const locale = useLocale();
  const mapId = `mini-map-${lat}-${lng}`.replace(/\./g, '-');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById(mapId);
    if (!container || container.childNodes.length > 0) return;

    import('leaflet').then((L) => {
      const map = L.map(mapId, {
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: false,
        doubleClickZoom: false,
        attributionControl: false,
      }).setView([lat, lng], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      const divIcon = L.divIcon({
        html: `<div style="font-size:28px;text-align:center;line-height:36px;width:36px;height:36px;background:linear-gradient(135deg,#f59e0b,#ea580c);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:3px solid white;">${icon}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        className: '',
      });

      L.marker([lat, lng], { icon: divIcon }).addTo(map);
    });
  }, [lat, lng, zoom, icon, mapId]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Map */}
      <div id={mapId} className="w-full h-[250px] md:h-[300px]" style={{ zIndex: 0 }} />

      {/* Info bar */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-sky-50 to-white">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-500">{lat.toFixed(4)}°N, {lng.toFixed(4)}°E</p>
          </div>
        </div>
        <Link
          href={`/${locale}/harita`}
          className="text-xs px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full font-medium hover:bg-sky-200 transition-colors"
        >
          🗺️ Full Map
        </Link>
      </div>
    </div>
  );
}
