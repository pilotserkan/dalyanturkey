// ---------------------------------------------------------------------------
// Schema.org JSON-LD generators
// ---------------------------------------------------------------------------

import { SITE_NAME, SITE_URL } from './constants';

// ---------------------------------------------------------------------------
// TouristAttraction
// ---------------------------------------------------------------------------

export function generateTouristAttractionSchema(data: {
  name: string;
  description: string;
  url: string;
  image?: string;
  geo?: { lat: number; lng: number };
}): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: data.name,
    description: data.description,
    url: data.url,
    isAccessibleForFree: true,
    touristType: 'Sightseeing',
  };

  if (data.image) {
    schema.image = data.image;
  }

  if (data.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: data.geo.lat,
      longitude: data.geo.lng,
    };
    schema.hasMap = `https://www.google.com/maps?q=${data.geo.lat},${data.geo.lng}`;
  }

  return schema;
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

export function generateFAQPageSchema(
  questions: { question: string; answer: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// WebSite (site-level, typically placed on the home page)
// ---------------------------------------------------------------------------

export function generateWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['tr', 'en'],
    description:
      'Dalyan, Mugla hakkinda kapsamli rehber: tarihi yerler, dogal guzellikler, turlar, wellness ve pratik bilgiler.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
