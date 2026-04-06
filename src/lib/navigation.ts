// ---------------------------------------------------------------------------
// Site Navigation Structure
// ---------------------------------------------------------------------------

export type HubSlug =
  | 'tarih'
  | 'doga'
  | 'wellness'
  | 'turlar'
  | 'yeme-icme'
  | 'pratik';

export interface NavItem {
  slug: string;
  translationKey: string; // key in common.json nav section
  icon: string; // emoji
  children?: NavItem[];
}

export interface HubConfig {
  slug: string;
  translationKey: string;
  icon: string;
  color: string; // tailwind color name
  children: NavItem[];
}

// ---------------------------------------------------------------------------
// Hub definitions
// ---------------------------------------------------------------------------

export const HUBS: Record<HubSlug, HubConfig> = {
  tarih: {
    slug: 'tarih',
    translationKey: 'nav.tarih',
    icon: '\u{1F3DB}\uFE0F', // classical building
    color: 'amber',
    children: [
      {
        slug: 'kaunos-antik-kenti',
        translationKey: 'nav.kaunos-antik-kenti',
        icon: '\u{1F3DB}\uFE0F',
      },
      {
        slug: 'kaya-mezarlari',
        translationKey: 'nav.kaya-mezarlari',
        icon: '\u26F0\uFE0F',
      },
    ],
  },

  doga: {
    slug: 'doga',
    translationKey: 'nav.doga',
    icon: '\u{1F333}',
    color: 'emerald',
    children: [
      {
        slug: 'iztuzu-plaji',
        translationKey: 'nav.iztuzu-plaji',
        icon: '\u{1F3D6}\uFE0F',
      },
      {
        slug: 'caretta-caretta',
        translationKey: 'nav.caretta-caretta',
        icon: '\u{1F422}',
      },
      {
        slug: 'koycegiz-golu',
        translationKey: 'nav.koycegiz-golu',
        icon: '\u{1F30A}',
      },
      {
        slug: 'dalyan-deltasi',
        translationKey: 'nav.dalyan-deltasi',
        icon: '\u{1F3DE}\uFE0F',
      },
      {
        slug: 'mavi-yengec',
        translationKey: 'nav.mavi-yengec',
        icon: '\u{1F980}',
      },
      {
        slug: 'kus-gozlemciligi',
        translationKey: 'nav.kus-gozlemciligi',
        icon: '\u{1F426}',
      },
      {
        slug: 'yuvarlakcay',
        translationKey: 'nav.yuvarlakcay',
        icon: '\u{1F4A7}',
      },
      {
        slug: 'sigla-ormani',
        translationKey: 'nav.sigla-ormani',
        icon: '\u{1F332}',
      },
      {
        slug: 'gun-batimi-noktalari',
        translationKey: 'nav.gun-batimi-noktalari',
        icon: '\u{1F305}',
      },
    ],
  },

  wellness: {
    slug: 'wellness',
    translationKey: 'nav.wellness',
    icon: '\u{1F9D6}',
    color: 'rose',
    children: [
      {
        slug: 'sultaniye-kaplicalari',
        translationKey: 'nav.sultaniye-kaplicalari',
        icon: '\u2668\uFE0F',
      },
      {
        slug: 'camur-banyosu',
        translationKey: 'nav.camur-banyosu',
        icon: '\u{1F9D6}',
      },
    ],
  },

  turlar: {
    slug: 'turlar',
    translationKey: 'nav.turlar',
    icon: '\u{1F6A4}',
    color: 'sky',
    children: [
      {
        slug: 'dalyan-tekne-turu',
        translationKey: 'nav.dalyan-tekne-turu',
        icon: '\u{1F6F6}',
      },
      {
        slug: 'kaunos-kultur-turu',
        translationKey: 'nav.kaunos-kultur-turu',
        icon: '\u{1F3DB}\uFE0F',
      },
      {
        slug: 'iztuzu-su-taksi',
        translationKey: 'nav.iztuzu-su-taksi',
        icon: '\u{1F6A4}',
      },
      {
        slug: 'caretta-izleme-turu',
        translationKey: 'nav.caretta-izleme-turu',
        icon: '\u{1F422}',
      },
      {
        slug: 'wellness-turu',
        translationKey: 'nav.wellness-turu',
        icon: '\u2668\uFE0F',
      },
      {
        slug: 'jeep-safari',
        translationKey: 'nav.jeep-safari',
        icon: '\u{1F697}',
      },
      {
        slug: 'ekincik-mavi-magara',
        translationKey: 'nav.ekincik-mavi-magara',
        icon: '\u{1F30A}',
      },
      {
        slug: 'saklikent-tlos-turu',
        translationKey: 'nav.saklikent-tlos-turu',
        icon: '\u{1F3D4}\uFE0F',
      },
      {
        slug: 'gunubirlik-geziler',
        translationKey: 'nav.gunubirlik-geziler',
        icon: '\u{1F5FA}\uFE0F',
      },
    ],
  },

  'yeme-icme': {
    slug: 'yeme-icme',
    translationKey: 'nav.yeme-icme',
    icon: '\u{1F37D}\uFE0F',
    color: 'orange',
    children: [
      {
        slug: 'dalyan-mutfagi',
        translationKey: 'nav.dalyan-mutfagi',
        icon: '\u{1F958}',
      },
    ],
  },

  pratik: {
    slug: 'pratik',
    translationKey: 'nav.pratik',
    icon: '\u{1F4CC}',
    color: 'slate',
    children: [
      {
        slug: 'dalaman-havalimanindan-dalyan',
        translationKey: 'nav.dalaman-havalimanindan-dalyan',
        icon: '\u2708\uFE0F',
      },
      {
        slug: 'ne-zaman-gidilir',
        translationKey: 'nav.ne-zaman-gidilir',
        icon: '\u{1F4C5}',
      },
      {
        slug: 'koycegiz-pazari',
        translationKey: 'nav.koycegiz-pazari',
        icon: '\u{1F6D2}',
      },
      {
        slug: 'sik-sorulan-sorular',
        translationKey: 'nav.sik-sorulan-sorular',
        icon: '\u2753',
      },
      {
        slug: 'surdurulebilir-turizm',
        translationKey: 'nav.surdurulebilir-turizm',
        icon: '\u267B\uFE0F',
      },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Standalone pages (not under any hub)
// ---------------------------------------------------------------------------

export const STANDALONE_PAGES: NavItem[] = [
  {
    slug: 'harita',
    translationKey: 'nav.harita',
    icon: '\u{1F5FA}\uFE0F',
  },
  {
    slug: 'hakkinda/dalyan-nerede',
    translationKey: 'nav.dalyan-nerede',
    icon: '\u{1F4CD}',
  },
];

// ---------------------------------------------------------------------------
// Hub order (used for rendering nav menus)
// ---------------------------------------------------------------------------

export const HUB_ORDER: HubSlug[] = [
  'tarih',
  'doga',
  'wellness',
  'turlar',
  'yeme-icme',
  'pratik',
];

// ---------------------------------------------------------------------------
// Flat list of every routable page path (relative, no locale prefix)
// ---------------------------------------------------------------------------

export const ALL_PAGE_SLUGS: string[] = (() => {
  const slugs: string[] = [];

  for (const hubSlug of HUB_ORDER) {
    const hub = HUBS[hubSlug];
    // hub index page
    slugs.push(hub.slug);
    // child pages
    for (const child of hub.children) {
      slugs.push(`${hub.slug}/${child.slug}`);
    }
  }

  // standalone pages
  for (const page of STANDALONE_PAGES) {
    slugs.push(page.slug);
  }

  return slugs;
})();

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Return the hub config for a given hub slug, or undefined if not found.
 */
export function getHubBySlug(slug: string): HubConfig | undefined {
  return HUBS[slug as HubSlug];
}

/**
 * Find the hub that owns a given child page slug.
 */
export function getHubForChild(childSlug: string): HubConfig | undefined {
  for (const hubSlug of HUB_ORDER) {
    const hub = HUBS[hubSlug];
    if (hub.children.some((c) => c.slug === childSlug)) {
      return hub;
    }
  }
  return undefined;
}

/**
 * Build breadcrumb items from a pathname.
 *
 * Example: "/tr/doga/iztuzu-plaji" ->
 *   [{ slug: "", translationKey: "nav.home" },
 *    { slug: "doga", translationKey: "nav.doga" },
 *    { slug: "doga/iztuzu-plaji", translationKey: "nav.iztuzu-plaji" }]
 */
export function getBreadcrumbs(
  pathname: string,
): { slug: string; translationKey: string }[] {
  // Strip leading slash and locale prefix (e.g. "/tr/doga/foo" -> "doga/foo")
  const cleaned = pathname.replace(/^\//, '');
  const segments = cleaned.split('/');

  // Remove locale prefix if present (2-letter code)
  if (segments[0] && /^[a-z]{2}$/.test(segments[0])) {
    segments.shift();
  }

  const crumbs: { slug: string; translationKey: string }[] = [
    { slug: '', translationKey: 'nav.home' },
  ];

  if (segments.length === 0 || (segments.length === 1 && segments[0] === '')) {
    return crumbs;
  }

  const hubSlug = segments[0];
  const hub = getHubBySlug(hubSlug);

  if (hub) {
    crumbs.push({ slug: hub.slug, translationKey: hub.translationKey });

    if (segments.length > 1) {
      const childSlug = segments[1];
      const child = hub.children.find((c) => c.slug === childSlug);
      if (child) {
        crumbs.push({
          slug: `${hub.slug}/${child.slug}`,
          translationKey: child.translationKey,
        });
      }
    }
  } else {
    // Standalone page
    const fullSlug = segments.join('/');
    const standalone = STANDALONE_PAGES.find((p) => p.slug === fullSlug);
    if (standalone) {
      crumbs.push({
        slug: standalone.slug,
        translationKey: standalone.translationKey,
      });
    }
  }

  return crumbs;
}
