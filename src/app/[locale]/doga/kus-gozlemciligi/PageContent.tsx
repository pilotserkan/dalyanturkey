'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="kusGozlem"
      sectionKeys={['overview', 'species', 'seasons', 'spots']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.8050}
      lng={28.6050}
      mapIcon="🐦"
    />
  );
}
