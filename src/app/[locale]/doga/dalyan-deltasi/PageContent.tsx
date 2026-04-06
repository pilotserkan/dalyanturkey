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
    />
  );
}
