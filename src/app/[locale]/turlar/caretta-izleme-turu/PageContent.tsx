'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="carettaIzlemeTuru"
      sectionKeys={['overview', 'conservation', 'whatYouSee']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-river-boats.jpg"
      lat={36.7850}
      lng={28.5983}
      mapIcon="🐢"
    />
  );
}
