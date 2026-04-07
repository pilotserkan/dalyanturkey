'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface LocationMiniMapProps {
  lat: number;
  lng: number;
  title: string;
  icon?: string;
  zoom?: number;
}

export default function LocationMiniMap({ lat, lng, title, icon = '\u{1F4CD}', zoom = 14 }: LocationMiniMapProps) {
  const locale = useLocale();
  const t = useTranslations('weather');
  const mapId = `mini-map-${lat}-${lng}`.replace(/\./g, '-');
  const [copied, setCopied] = useState<'coords' | 'link' | null>(null);

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

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText(`${lat},${lng}`);
      setCopied('coords');
      setTimeout(() => setCopied(null), 2000);
    } catch { /* fallback silently */ }
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied('link');
      setTimeout(() => setCopied(null), 2000);
    } catch { /* fallback silently */ }
  };

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
            <p className="text-xs text-gray-500">{lat.toFixed(4)}{'\u00B0'}N, {lng.toFixed(4)}{'\u00B0'}E</p>
          </div>
        </div>
        <Link
          href={`/${locale}/harita`}
          className="text-xs px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full font-medium hover:bg-sky-200 transition-colors"
        >
          {'\u{1F5FA}\uFE0F'} Full Map
        </Link>
      </div>

      {/* Navigation buttons */}
      <div className="px-4 pb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('navigate')}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors border border-blue-100"
          >
            {'\u{1F4CD}'} Google Maps
          </a>
          <a
            href={`https://maps.apple.com/?daddr=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors border border-gray-200"
          >
            {'\u{1F34F}'} Apple Maps
          </a>
          <a
            href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium hover:bg-cyan-100 transition-colors border border-cyan-100"
          >
            {'\u{1F697}'} Waze
          </a>
          <button
            onClick={handleCopyCoords}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium hover:bg-amber-100 transition-colors border border-amber-100"
          >
            {copied === 'coords' ? '\u2705' : '\u{1F4CB}'} {copied === 'coords' ? t('copied') : t('copyCoords')}
          </button>
        </div>
      </div>

      {/* Share location */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('shareLocation')}</p>
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 font-mono truncate border border-gray-100">
            https://www.google.com/maps?q={lat},{lng}
          </div>
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 bg-sky-100 text-sky-700 rounded-lg text-xs font-medium hover:bg-sky-200 transition-colors border border-sky-200"
          >
            {copied === 'link' ? t('copied') : '\u{1F4CB}'}
          </button>
        </div>
      </div>
    </div>
  );
}
