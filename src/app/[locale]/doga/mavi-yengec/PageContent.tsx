'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="maviYengec"
      sectionKeys={['overview', 'culinary', 'ecosystem']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.8345}
      lng={28.6320}
      mapIcon="🦀"
    />
  );
}
