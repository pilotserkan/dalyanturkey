'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="pratik"
      pageKey="neZamanGidilir"
      sectionKeys={['overview', 'peakSeason', 'shoulderSeason', 'offSeason']}
      hubSlug="pratik"
      backgroundImage="/images/dalyan-town-night.jpg"
      lat={36.8333}
      lng={28.6333}
      mapIcon="📅"
    />
  );
}
