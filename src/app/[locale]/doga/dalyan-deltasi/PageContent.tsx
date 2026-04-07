'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="delta"
      sectionKeys={['overview', 'biodiversity', 'boatRide']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.8100}
      lng={28.6150}
      mapIcon="🏞️"
    />
  );
}
