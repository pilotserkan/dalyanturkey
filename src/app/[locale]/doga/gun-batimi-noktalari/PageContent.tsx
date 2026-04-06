'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="gunBatimi"
      sectionKeys={['overview', 'bestSpots', 'photography']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-river-night.jpg"
    />
  );
}
