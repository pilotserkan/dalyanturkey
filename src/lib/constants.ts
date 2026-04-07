// ---------------------------------------------------------------------------
// Site-wide constants & static data
// ---------------------------------------------------------------------------

export const SITE_URL = 'https://dalyanturkey.com';
export const SITE_NAME = 'DalyanTurkey.com';

export const DALYAN_CENTER = { lat: 36.8333, lng: 28.6333 } as const;

// ---------------------------------------------------------------------------
// POI categories
// ---------------------------------------------------------------------------

export type POICategory =
  | 'ancient'
  | 'beaches'
  | 'nature'
  | 'wellness'
  | 'tours'
  | 'dining'
  | 'transport';

export interface POI {
  id: string;
  lat: number;
  lng: number;
  category: POICategory;
  icon: string;
  pageSlug?: string; // link to content page if exists
}

// ---------------------------------------------------------------------------
// Points of interest (25+)
// ---------------------------------------------------------------------------

export const POI_DATA: POI[] = [
  // --- Ancient / Historical ---
  {
    id: 'kaunos',
    lat: 36.8258,
    lng: 28.6225,
    category: 'ancient',
    icon: '\u{1F3DB}\uFE0F',
    pageSlug: 'tarih/kaunos-antik-kenti',
  },
  {
    id: 'rock-tombs',
    lat: 36.8336,
    lng: 28.6342,
    category: 'ancient',
    icon: '\u26F0\uFE0F',
    pageSlug: 'tarih/kaya-mezarlari',
  },

  // --- Beaches ---
  {
    id: 'iztuzu-beach',
    lat: 36.7922,
    lng: 28.6200,
    category: 'beaches',
    icon: '\u{1F3D6}\uFE0F',
    pageSlug: 'doga/iztuzu-plaji',
  },
  {
    id: 'ekincik-beach',
    lat: 36.7850,
    lng: 28.5370,
    category: 'beaches',
    icon: '\u{1F3D6}\uFE0F',
    pageSlug: 'turlar/ekincik-mavi-magara',
  },

  // --- Nature ---
  {
    id: 'dekamer',
    lat: 36.7890,
    lng: 28.6250,
    category: 'nature',
    icon: '\u{1F422}',
    pageSlug: 'doga/caretta-caretta',
  },
  {
    id: 'koycegiz-lake',
    lat: 36.9580,
    lng: 28.6830,
    category: 'nature',
    icon: '\u{1F30A}',
    pageSlug: 'doga/koycegiz-golu',
  },
  {
    id: 'dalyan-delta',
    lat: 36.8100,
    lng: 28.6150,
    category: 'nature',
    icon: '\u{1F3DE}\uFE0F',
    pageSlug: 'doga/dalyan-deltasi',
  },
  {
    id: 'dalyan-canal',
    lat: 36.8200,
    lng: 28.6280,
    category: 'nature',
    icon: '\u{1F6F6}',
  },
  {
    id: 'sulungur-lake',
    lat: 36.8050,
    lng: 28.6080,
    category: 'nature',
    icon: '\u{1F4A7}',
  },
  {
    id: 'yuvarlakcay',
    lat: 36.9300,
    lng: 28.7200,
    category: 'nature',
    icon: '\u{1F4A7}',
    pageSlug: 'doga/yuvarlakcay',
  },
  {
    id: 'sigla-forest',
    lat: 36.9400,
    lng: 28.6900,
    category: 'nature',
    icon: '\u{1F332}',
    pageSlug: 'doga/sigla-ormani',
  },
  {
    id: 'sunset-point-iztuzu',
    lat: 36.7950,
    lng: 28.6100,
    category: 'nature',
    icon: '\u{1F305}',
    pageSlug: 'doga/gun-batimi-noktalari',
  },
  {
    id: 'bird-watching-delta',
    lat: 36.8050,
    lng: 28.6050,
    category: 'nature',
    icon: '\u{1F426}',
    pageSlug: 'doga/kus-gozlemciligi',
  },

  // --- Wellness ---
  {
    id: 'mud-baths',
    lat: 36.8420,
    lng: 28.6500,
    category: 'wellness',
    icon: '\u{1F9D6}',
    pageSlug: 'wellness/camur-banyosu',
  },
  {
    id: 'sultaniye-thermal',
    lat: 36.8480,
    lng: 28.6580,
    category: 'wellness',
    icon: '\u2668\uFE0F',
    pageSlug: 'wellness/sultaniye-kaplicalari',
  },

  // --- Tours (departure/meeting points) ---
  {
    id: 'river-port',
    lat: 36.8340,
    lng: 28.6380,
    category: 'tours',
    icon: '\u{1F6F6}',
    pageSlug: 'turlar/dalyan-tekne-turu',
  },
  {
    id: 'iztuzu-water-taxi',
    lat: 36.8335,
    lng: 28.6375,
    category: 'tours',
    icon: '\u{1F6A4}',
    pageSlug: 'turlar/iztuzu-su-taksi',
  },

  // --- Dining ---
  {
    id: 'riverside-restaurants',
    lat: 36.8345,
    lng: 28.6365,
    category: 'dining',
    icon: '\u{1F37D}\uFE0F',
    pageSlug: 'yeme-icme/dalyan-mutfagi',
  },
  {
    id: 'town-center-dining',
    lat: 36.8340,
    lng: 28.6355,
    category: 'dining',
    icon: '\u{1F958}',
  },
  {
    id: 'maras-district',
    lat: 36.8365,
    lng: 28.6400,
    category: 'dining',
    icon: '\u{1F37D}\uFE0F',
  },

  // --- Transport & towns ---
  {
    id: 'dalyan-town-center',
    lat: 36.8338,
    lng: 28.6370,
    category: 'transport',
    icon: '\u{1F3D8}\uFE0F',
  },
  {
    id: 'dalaman-airport',
    lat: 36.7131,
    lng: 28.7925,
    category: 'transport',
    icon: '\u2708\uFE0F',
    pageSlug: 'pratik/dalaman-havalimanindan-dalyan',
  },
  {
    id: 'ortaca',
    lat: 36.8408,
    lng: 28.7669,
    category: 'transport',
    icon: '\u{1F68C}',
  },
  {
    id: 'koycegiz-town',
    lat: 36.9708,
    lng: 28.6869,
    category: 'transport',
    icon: '\u{1F3D8}\uFE0F',
    pageSlug: 'pratik/koycegiz-pazari',
  },
  {
    id: 'candir-village',
    lat: 36.8280,
    lng: 28.6200,
    category: 'transport',
    icon: '\u{1F3E1}',
  },
];

// ---------------------------------------------------------------------------
// Hub colour themes (Tailwind utility classes)
// ---------------------------------------------------------------------------

export const HUB_THEMES: Record<
  string,
  { bg: string; text: string; accent: string; gradient: string }
> = {
  tarih: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'bg-amber-600',
    gradient: 'from-amber-700 to-amber-900',
  },
  doga: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    accent: 'bg-emerald-600',
    gradient: 'from-emerald-700 to-emerald-900',
  },
  wellness: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    accent: 'bg-rose-600',
    gradient: 'from-rose-700 to-rose-900',
  },
  turlar: {
    bg: 'bg-sky-50',
    text: 'text-sky-900',
    accent: 'bg-sky-600',
    gradient: 'from-sky-700 to-sky-900',
  },
  'yeme-icme': {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'bg-orange-600',
    gradient: 'from-orange-700 to-orange-900',
  },
  pratik: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-slate-600',
    gradient: 'from-slate-700 to-slate-900',
  },
};
