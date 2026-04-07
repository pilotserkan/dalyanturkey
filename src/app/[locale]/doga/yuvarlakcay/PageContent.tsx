'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="yuvarlakcay"
      sectionKeys={['overview', 'nature', 'visiting']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.8550}
      lng={28.7300}
      mapIcon="💧"
    />
  );
}
