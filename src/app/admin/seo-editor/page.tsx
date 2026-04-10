'use client';

import React, { useState, useMemo } from 'react';
import { ALL_PAGE_SLUGS } from '@/lib/navigation';

// ---------------------------------------------------------------------------
// Metadata from en/common.json (embedded for admin-only usage)
// ---------------------------------------------------------------------------
const METADATA: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Dalyan Turkey | Ancient Kaunos, Iztuzu Beach & Caretta Caretta',
    description:
      'Discover Dalyan, Turkey — explore ancient Kaunos ruins, pristine Iztuzu Beach, Caretta Caretta turtles, thermal springs & river boat tours in this Mediterranean gem.',
  },
  tarih: {
    title: 'Ancient Sites & Historical Treasures | Dalyan Turkey',
    description:
      "Explore Dalyan's rich history spanning 3,000 years — from the ancient Carian city of Kaunos to magnificent Lycian rock tombs carved into riverside cliffs.",
  },
  'tarih/kaunos-antik-kenti': {
    title: 'Kaunos Ancient City | 3000-Year-Old Carian-Lycian City',
    description:
      'Visit Kaunos Ancient City near Dalyan — a 3,000-year-old Carian-Lycian settlement with temples, theatre, Roman baths and a strategic harbour on the river delta.',
  },
  'tarih/kaya-mezarlari': {
    title: 'Dalyan Rock Tombs | 2400-Year-Old Lycian Royal Tombs',
    description:
      'Marvel at the iconic Lycian rock tombs of Dalyan — 2,400-year-old royal burial chambers carved high into the cliffs overlooking the Dalyan River and reed-lined delta.',
  },
  doga: {
    title: 'Nature & Wildlife | Dalyan Turkey',
    description:
      "Discover Dalyan's extraordinary nature — Iztuzu turtle beach, Dalyan Delta wetlands, Lake Koycegiz, 180+ bird species and the world's only native Liquidambar forest.",
  },
  'doga/iztuzu-plaji': {
    title: 'Iztuzu Beach - Turtle Beach | 12km Pristine Sand',
    description:
      'Visit Iztuzu Beach (Turtle Beach) in Dalyan — a 12km pristine sand strip where Caretta Caretta sea turtles nest, bordered by the river delta and Mediterranean Sea.',
  },
  'doga/caretta-caretta': {
    title: 'Caretta Caretta Sea Turtles | Nesting Season & Conservation',
    description:
      'Learn about Caretta Caretta loggerhead sea turtles in Dalyan — nesting season on Iztuzu Beach, conservation efforts, ethical watching tips and lifecycle facts.',
  },
  'doga/koycegiz-golu': {
    title: 'Lake Koycegiz | Freshwater-Saltwater Lagoon',
    description:
      'Explore Lake Koycegiz near Dalyan — a vast freshwater-saltwater lagoon surrounded by pine forests, home to thermal springs, wildlife and stunning sunset panoramas.',
  },
  'doga/dalyan-deltasi': {
    title: 'Dalyan Delta | Reed Maze & Wetland Ecosystem',
    description:
      'Navigate the Dalyan Delta reed maze — a protected wetland ecosystem connecting Lake Koycegiz to the Mediterranean, teeming with birdlife, fish and blue crabs.',
  },
  'doga/mavi-yengec': {
    title: 'Blue Crab of Dalyan | Atlantic Visitor in Koycegiz',
    description:
      'Discover the blue crab of Dalyan — an Atlantic species thriving in the Koycegiz-Dalyan lagoon system, now a local delicacy and subject of ecological research.',
  },
  'doga/kus-gozlemciligi': {
    title: 'Birdwatching in Dalyan | 180+ Species Guide',
    description:
      'Birdwatching in Dalyan and Koycegiz — spot 180+ species including Dalmatian pelicans, kingfishers and ospreys in the delta wetlands and surrounding habitats.',
  },
  'doga/yuvarlakcay': {
    title: 'Yuvarlakcay | Crystal Stream & Trout Restaurants',
    description:
      'Visit Yuvarlakcay near Dalyan — a crystal-clear mountain stream with waterside trout restaurants, shaded picnic areas and refreshing natural swimming spots.',
  },
  'doga/sigla-ormani': {
    title: "Liquidambar Forest | World's Only Native Habitat",
    description:
      'Explore the ancient Liquidambar orientalis forest near Dalyan — the world\'s only remaining native habitat for this rare sweet gum tree, a living botanical relic.',
  },
  'doga/gun-batimi-noktalari': {
    title: 'Best Sunset Spots in Dalyan | Photography Guide',
    description:
      'Find the best sunset spots in Dalyan — from riverside cafes facing the rock tombs to Iztuzu Beach hilltop and Lake Koycegiz panoramas. Photography tips included.',
  },
  wellness: {
    title: 'Wellness & Thermal Springs | Dalyan Turkey',
    description:
      "Experience Dalyan's wellness traditions — Sultaniye thermal hot springs with 2,000-year history and legendary mud baths known since Cleopatra's era for healing.",
  },
  'wellness/sultaniye-kaplicalari': {
    title: 'Sultaniye Hot Springs | 2000-Year-Old Healing Waters',
    description:
      'Bathe in Sultaniye Hot Springs near Dalyan — 39C thermal waters rich in minerals, used for healing since ancient times. Open-air pools beside Lake Koycegiz shores.',
  },
  'wellness/camur-banyosu': {
    title: "Dalyan Mud Baths | Cleopatra's Beauty Secret",
    description:
      "Try Dalyan's famous mud baths — mineral-rich natural clay believed to rejuvenate skin since Cleopatra's time. A unique open-air wellness experience by the lake.",
  },
  turlar: {
    title: 'River Routes & Excursions | Dalyan Turkey',
    description:
      'Explore Dalyan by boat, jeep or on foot — river cruises past rock tombs, Iztuzu Beach trips, turtle watching, canyon adventures and guided cultural excursions.',
  },
  'turlar/dalyan-tekne-turu': {
    title: 'Classic Dalyan Boat Tour | Full Day River Experience',
    description:
      'Join the classic Dalyan boat tour — a full-day river cruise past Lycian rock tombs, through the reed delta to Iztuzu Beach, mud baths and Sultaniye hot springs.',
  },
  'turlar/kaunos-kultur-turu': {
    title: 'Kaunos Culture Tour | Guided Ancient City Walk',
    description:
      "Take a guided Kaunos culture tour from Dalyan — expert-led walk through the ancient city's theatre, temples, agora and harbour with historical commentary.",
  },
  'turlar/iztuzu-su-taksi': {
    title: 'Iztuzu Water Taxi | Direct Beach Transfer',
    description:
      'Catch the Iztuzu water taxi from Dalyan town centre — a quick, scenic river transfer directly to Turtle Beach. Regular departures, affordable and convenient.',
  },
  'turlar/caretta-izleme-turu': {
    title: 'Ethical Caretta Watching Tour | Sea Turtle Observation',
    description:
      'Join an ethical Caretta Caretta watching tour in Dalyan — observe loggerhead sea turtles in their natural habitat with trained guides following conservation rules.',
  },
  'turlar/wellness-turu': {
    title: 'Dalyan Wellness Tour | Mud Bath & Hot Springs Day',
    description:
      'Book a Dalyan wellness day tour — combine mud baths, Sultaniye hot springs and a relaxing river boat cruise for the ultimate rejuvenation experience in nature.',
  },
  'turlar/jeep-safari': {
    title: 'Dalyan Jeep Safari | Villages, Waterfalls & Adventure',
    description:
      "Explore Dalyan's rugged backcountry by jeep — visit mountain villages, hidden waterfalls, pine forests and panoramic viewpoints on this off-road adventure tour.",
  },
  'turlar/ekincik-mavi-magara': {
    title: 'Ekincik Bay & Blue Cave | Hidden Mediterranean Cove',
    description:
      'Sail from Dalyan to Ekincik Bay and the Blue Cave — a hidden Mediterranean cove with turquoise waters, pine-clad shores and excellent snorkelling conditions.',
  },
  'turlar/saklikent-tlos-turu': {
    title: 'Saklikent Canyon & Tlos | Day Trip from Dalyan',
    description:
      "Day trip from Dalyan to Saklikent Canyon and Tlos ancient city — wade through Europe's deepest gorge and explore a Lycian hilltop fortress with valley views.",
  },
  'turlar/gunubirlik-geziler': {
    title: 'Day Trips from Dalyan | Fethiye, Pamukkale & More',
    description:
      'Plan day trips from Dalyan — visit Fethiye\'s Blue Lagoon, Pamukkale travertines, Ephesus ruins, Rhodes Island and more. Transport options and itinerary tips.',
  },
  'yeme-icme': {
    title: 'Dalyan Cuisine & Local Flavors | Food Guide',
    description:
      "Taste Dalyan's local cuisine — fresh river fish, blue crab, Aegean herbs, Ottoman-inspired dishes and farm-to-table flavours at riverside restaurants and markets.",
  },
  'yeme-icme/dalyan-mutfagi': {
    title: 'Dalyan Kitchen | Traditional Dishes & Seafood',
    description:
      "Explore Dalyan's traditional kitchen — grilled sea bass, blue crab pasta, herb-stuffed flatbreads, local honey and regional specialities from the Mugla province.",
  },
  pratik: {
    title: 'Practical Travel Information | Dalyan Turkey',
    description:
      'Plan your Dalyan trip — airport transfers, best travel seasons, local markets, sustainable tourism tips and answers to frequently asked questions about Dalyan.',
  },
  'pratik/dalaman-havalimanindan-dalyan': {
    title: 'Dalaman Airport to Dalyan | Transfer & Transport Guide',
    description:
      'Get from Dalaman Airport to Dalyan easily — shuttle buses, private transfers, car rental and taxi options with journey times, prices and booking advice.',
  },
  'pratik/ne-zaman-gidilir': {
    title: 'Best Time to Visit Dalyan | Season-by-Season Guide',
    description:
      'Find the best time to visit Dalyan — season-by-season weather, turtle nesting dates, swimming conditions, crowd levels and event calendars for planning your trip.',
  },
  'pratik/koycegiz-pazari': {
    title: 'Koycegiz Monday Market | Authentic Turkish Bazaar',
    description:
      'Visit the Koycegiz Monday market near Dalyan — a vibrant Turkish bazaar with fresh produce, spices, textiles, handcrafts and local specialities every Monday.',
  },
  'pratik/sik-sorulan-sorular': {
    title: 'Dalyan FAQ | Everything You Need to Know',
    description:
      'Dalyan FAQ — answers to common questions about getting there, accommodation, beaches, boat tours, weather, safety, currency and local customs for travellers.',
  },
  'pratik/surdurulebilir-turizm': {
    title: 'Sustainable Tourism in Dalyan | Ethical Traveler Guide',
    description:
      'Practice sustainable tourism in Dalyan — respect turtle nesting sites, support local businesses, reduce plastic waste and protect this fragile Mediterranean ecosystem.',
  },
  harita: {
    title: 'Interactive Tourism Map | Dalyan Turkey',
    description:
      'Explore Dalyan with our interactive map — locate beaches, ancient sites, restaurants, boat stops, thermal springs and key attractions with directions and details.',
  },
  'hakkinda/dalyan-nerede': {
    title: 'Where is Dalyan? | Geography & Getting Here',
    description:
      "Learn about Dalyan's geography — located in Mugla province on Turkey's Turquoise Coast, nestled between Lake Koycegiz and the Mediterranean Sea. Getting here guide.",
  },
};

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------
function titleScore(len: number): { score: number; color: string; label: string } {
  if (len >= 50 && len <= 60) return { score: 100, color: 'text-green-600', label: 'Good' };
  if (len >= 40 && len < 50) return { score: 70, color: 'text-yellow-600', label: 'OK' };
  if (len > 60 && len <= 70) return { score: 60, color: 'text-yellow-600', label: 'Long' };
  if (len > 70) return { score: 20, color: 'text-red-600', label: 'Too Long' };
  if (len < 30) return { score: 20, color: 'text-red-600', label: 'Too Short' };
  return { score: 50, color: 'text-yellow-600', label: 'Short' };
}

function descScore(len: number): { score: number; color: string; label: string } {
  if (len >= 150 && len <= 160) return { score: 100, color: 'text-green-600', label: 'Good' };
  if (len >= 120 && len < 150) return { score: 65, color: 'text-yellow-600', label: 'Short' };
  if (len > 160 && len <= 180) return { score: 55, color: 'text-yellow-600', label: 'Long' };
  if (len < 120) return { score: 20, color: 'text-red-600', label: 'Too Short' };
  if (len > 180) return { score: 20, color: 'text-red-600', label: 'Too Long' };
  return { score: 50, color: 'text-yellow-600', label: 'OK' };
}

function overallScore(tLen: number, dLen: number): number {
  return Math.round((titleScore(tLen).score + descScore(dLen).score) / 2);
}

function scoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
}

function scoreBg(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

function scoreRingColor(score: number): string {
  if (score >= 80) return 'stroke-green-500';
  if (score >= 50) return 'stroke-yellow-500';
  return 'stroke-red-500';
}

function statusBadge(score: number) {
  if (score >= 80)
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Good
      </span>
    );
  if (score >= 50)
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Needs Work
      </span>
    );
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      Poor
    </span>
  );
}

function CharBar({ current, min, max, optMin, optMax }: { current: number; min: number; max: number; optMin: number; optMax: number }) {
  const pct = Math.min((current / max) * 100, 100);
  const optStartPct = (optMin / max) * 100;
  const optEndPct = (optMax / max) * 100;
  const inRange = current >= optMin && current <= optMax;
  const barColor = inRange ? 'bg-green-500' : current > optMax ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* optimal zone indicator */}
        <div
          className="absolute h-full bg-green-100"
          style={{ left: `${optStartPct}%`, width: `${optEndPct - optStartPct}%` }}
        />
        {/* actual bar */}
        <div
          className={`absolute h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>{current} chars</span>
        <span className="text-gray-300">
          optimal: {optMin}-{optMax}
        </span>
      </div>
    </div>
  );
}

function ScoreCircle({ score, size = 48 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={4} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={scoreRingColor(score)}
          strokeWidth={4}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-xs font-bold ${scoreColor(score)}`}>{score}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slug quality check
// ---------------------------------------------------------------------------
function slugQuality(slug: string): { ok: boolean; notes: string[] } {
  const notes: string[] = [];
  if (slug.includes('_')) notes.push('Contains underscores (prefer hyphens)');
  if (/[A-Z]/.test(slug)) notes.push('Contains uppercase characters');
  if (slug.length > 75) notes.push('URL slug is very long');
  if (notes.length === 0) return { ok: true, notes: ['Clean, hyphenated slug'] };
  return { ok: false, notes };
}

// ---------------------------------------------------------------------------
// Page data builder
// ---------------------------------------------------------------------------
interface PageSeoData {
  slug: string;
  title: string;
  description: string;
  titleLen: number;
  descLen: number;
  score: number;
  focusKeyword: string;
}

function buildPageData(): PageSeoData[] {
  const allSlugs = ['home', ...ALL_PAGE_SLUGS];
  return allSlugs.map((slug) => {
    const meta = METADATA[slug] ?? { title: '', description: '' };
    const titleLen = meta.title.length;
    const descLen = meta.description.length;
    return {
      slug,
      title: meta.title,
      description: meta.description,
      titleLen,
      descLen,
      score: overallScore(titleLen, descLen),
      focusKeyword: '',
    };
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SeoEditorPage() {
  const [pages, setPages] = useState<PageSeoData[]>(() => buildPageData());
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'good' | 'needs-work' | 'poor'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = pages;
    if (filter === 'good') list = list.filter((p) => p.score >= 80);
    if (filter === 'needs-work') list = list.filter((p) => p.score >= 50 && p.score < 80);
    if (filter === 'poor') list = list.filter((p) => p.score < 50);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.slug.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }
    return list;
  }, [pages, filter, search]);

  const stats = useMemo(() => {
    const good = pages.filter((p) => p.score >= 80).length;
    const needsWork = pages.filter((p) => p.score >= 50 && p.score < 80).length;
    const poor = pages.filter((p) => p.score < 50).length;
    const avg = Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
    return { good, needsWork, poor, avg, total: pages.length };
  }, [pages]);

  function updateFocusKeyword(slug: string, kw: string) {
    setPages((prev) => prev.map((p) => (p.slug === slug ? { ...p, focusKeyword: kw } : p)));
  }

  function exportReport() {
    const rows = [
      ['Page Slug', 'Title', 'Title Length', 'Description', 'Desc Length', 'SEO Score', 'Status'],
      ...pages.map((p) => [
        p.slug,
        `"${p.title}"`,
        String(p.titleLen),
        `"${p.description}"`,
        String(p.descLen),
        String(p.score),
        p.score >= 80 ? 'Good' : p.score >= 50 ? 'Needs Work' : 'Poor',
      ]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">SEO Editor</h1>
        <p className="text-gray-500 mt-1">
          Yoast-style SEO analysis for all {stats.total} pages
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-4 text-center">
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500 mt-1">Total Pages</div>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <ScoreCircle score={stats.avg} size={56} />
          <div className="text-sm text-gray-500 mt-1">Avg Score</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.good}</div>
          <div className="text-sm text-gray-500 mt-1">Good</div>
        </div>
        <div className="bg-white rounded-xl border border-yellow-200 p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.needsWork}</div>
          <div className="text-sm text-gray-500 mt-1">Needs Work</div>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
          <div className="text-3xl font-bold text-red-600">{stats.poor}</div>
          <div className="text-sm text-gray-500 mt-1">Poor</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'good', 'needs-work', 'poor'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all'
                ? 'All'
                : f === 'good'
                ? 'Good'
                : f === 'needs-work'
                ? 'Needs Work'
                : 'Poor'}
            </button>
          ))}
        </div>

        <div className="flex-1 sm:ml-4">
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={exportReport}
          className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Page</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 w-20">Title Len</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 w-20">Desc Len</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 w-20">Score</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 w-24">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((page, idx) => {
                const tScore = titleScore(page.titleLen);
                const dScore = descScore(page.descLen);
                const isExpanded = expandedRow === page.slug;
                const slug = slugQuality(page.slug);

                return (
                  <React.Fragment key={page.slug}>
                    <tr
                      className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                        isExpanded ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setExpandedRow(isExpanded ? null : page.slug)}
                    >
                      <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">/{page.slug}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{page.title}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-mono text-xs font-semibold ${tScore.color}`}>
                          {page.titleLen}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-mono text-xs font-semibold ${dScore.color}`}>
                          {page.descLen}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreCircle score={page.score} size={36} />
                      </td>
                      <td className="px-4 py-3 text-center">{statusBadge(page.score)}</td>
                      <td className="px-4 py-3 text-center">
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr className="bg-blue-50/50">
                        <td colSpan={8} className="px-4 py-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left: title & description analysis */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                  Meta Title
                                </label>
                                <p className="text-sm text-gray-800 bg-white border rounded-lg p-3 mb-2">
                                  {page.title}
                                </p>
                                <CharBar
                                  current={page.titleLen}
                                  min={0}
                                  max={80}
                                  optMin={50}
                                  optMax={60}
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                  Meta Description
                                </label>
                                <p className="text-sm text-gray-800 bg-white border rounded-lg p-3 mb-2">
                                  {page.description}
                                </p>
                                <CharBar
                                  current={page.descLen}
                                  min={0}
                                  max={200}
                                  optMin={150}
                                  optMax={160}
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                  Focus Keyword
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter focus keyword..."
                                  value={page.focusKeyword}
                                  onChange={(e) => updateFocusKeyword(page.slug, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            {/* Right: SEO checklist */}
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                SEO Analysis
                              </h4>
                              <div className="space-y-2">
                                {/* Title length */}
                                <CheckItem
                                  ok={page.titleLen >= 50 && page.titleLen <= 60}
                                  warn={page.titleLen >= 40 && page.titleLen <= 70}
                                  label={`Title length: ${page.titleLen} characters (ideal: 50-60)`}
                                />
                                {/* Description length */}
                                <CheckItem
                                  ok={page.descLen >= 150 && page.descLen <= 160}
                                  warn={page.descLen >= 120 && page.descLen <= 180}
                                  label={`Description length: ${page.descLen} characters (ideal: 150-160)`}
                                />
                                {/* Title has pipe separator */}
                                <CheckItem
                                  ok={page.title.includes('|')}
                                  warn={page.title.includes('-')}
                                  label={
                                    page.title.includes('|')
                                      ? 'Title uses pipe separator for branding'
                                      : 'Consider adding brand with pipe separator'
                                  }
                                />
                                {/* URL slug quality */}
                                <CheckItem
                                  ok={slug.ok}
                                  warn={true}
                                  label={`URL slug: /${page.slug} ${slug.ok ? '(clean)' : `(${slug.notes.join(', ')})`}`}
                                />
                                {/* Description starts with action verb */}
                                <CheckItem
                                  ok={/^(Discover|Explore|Visit|Learn|Find|Join|Book|Try|Take|Plan|Get|Catch|Sail|Day trip|Navigate|Marvel|Bathe|Practice|Taste|Birdwatching)/i.test(
                                    page.description
                                  )}
                                  warn={true}
                                  label={
                                    /^(Discover|Explore|Visit|Learn|Find|Join|Book|Try|Take|Plan|Get|Catch|Sail|Navigate|Marvel|Bathe|Practice|Taste|Birdwatching)/i.test(
                                      page.description
                                    )
                                      ? 'Description starts with action verb'
                                      : 'Consider starting description with an action verb'
                                  }
                                />
                                {/* Focus keyword presence */}
                                {page.focusKeyword && (
                                  <>
                                    <CheckItem
                                      ok={page.title
                                        .toLowerCase()
                                        .includes(page.focusKeyword.toLowerCase())}
                                      warn={false}
                                      label={
                                        page.title
                                          .toLowerCase()
                                          .includes(page.focusKeyword.toLowerCase())
                                          ? `Focus keyword "${page.focusKeyword}" found in title`
                                          : `Focus keyword "${page.focusKeyword}" NOT in title`
                                      }
                                    />
                                    <CheckItem
                                      ok={page.description
                                        .toLowerCase()
                                        .includes(page.focusKeyword.toLowerCase())}
                                      warn={false}
                                      label={
                                        page.description
                                          .toLowerCase()
                                          .includes(page.focusKeyword.toLowerCase())
                                          ? `Focus keyword "${page.focusKeyword}" found in description`
                                          : `Focus keyword "${page.focusKeyword}" NOT in description`
                                      }
                                    />
                                    <CheckItem
                                      ok={page.slug
                                        .toLowerCase()
                                        .includes(
                                          page.focusKeyword.toLowerCase().replace(/\s+/g, '-')
                                        )}
                                      warn={false}
                                      label={
                                        page.slug
                                          .toLowerCase()
                                          .includes(
                                            page.focusKeyword.toLowerCase().replace(/\s+/g, '-')
                                          )
                                          ? `Focus keyword found in URL slug`
                                          : `Focus keyword NOT in URL slug`
                                      }
                                    />
                                  </>
                                )}
                              </div>

                              {/* Overall score */}
                              <div className="mt-6 p-4 bg-white rounded-lg border flex items-center gap-4">
                                <ScoreCircle score={page.score} size={56} />
                                <div>
                                  <div className={`text-lg font-bold ${scoreColor(page.score)}`}>
                                    {page.score >= 80
                                      ? 'Good SEO'
                                      : page.score >= 50
                                      ? 'Needs Improvement'
                                      : 'Poor SEO'}
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    Based on title and description quality analysis
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No pages match your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Check item component
// ---------------------------------------------------------------------------
function CheckItem({ ok, warn, label }: { ok: boolean; warn: boolean; label: string }) {
  const icon = ok ? (
    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ) : warn ? (
    <svg className="w-4 h-4 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="flex items-start gap-2 text-sm text-gray-700">
      {icon}
      <span>{label}</span>
    </div>
  );
}
