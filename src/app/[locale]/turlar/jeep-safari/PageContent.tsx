'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="jeepSafari"
      sectionKeys={['overview', 'route', 'experience']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-mountain.jpg"
      lat={36.8500}
      lng={28.6500}
      mapIcon="🚙"
    />
  );
}
