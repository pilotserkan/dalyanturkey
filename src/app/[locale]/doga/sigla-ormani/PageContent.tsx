'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="sigla"
      sectionKeys={['overview', 'resin', 'visiting']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-trees.jpg"
      lat={36.8917}
      lng={28.7000}
      mapIcon="🌲"
    />
  );
}
