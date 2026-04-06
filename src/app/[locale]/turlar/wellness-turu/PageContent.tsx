'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="wellnessTuru"
      sectionKeys={['overview', 'itinerary', 'benefits']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-riverside.jpg"
    />
  );
}
