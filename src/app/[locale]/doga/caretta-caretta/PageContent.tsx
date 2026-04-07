'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="caretta"
      sectionKeys={['species', 'lifecycle', 'threats', 'dalyanConnection']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.7850}
      lng={28.5983}
      mapIcon="🐢"
    />
  );
}
