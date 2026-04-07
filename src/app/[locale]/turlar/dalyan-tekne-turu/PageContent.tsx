'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="dalyanTekneTuru"
      sectionKeys={['overview', 'route', 'whatToExpect']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-river-boats.jpg"
      lat={36.8340}
      lng={28.6310}
      mapIcon="⛵"
    />
  );
}
