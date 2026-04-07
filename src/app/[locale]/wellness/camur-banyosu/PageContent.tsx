'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="wellness"
      pageKey="camur"
      sectionKeys={['ritual', 'minerals', 'cleopatra', 'whichBath', 'tips']}
      hubSlug="wellness"
      backgroundImage="/images/dalyan-riverside.jpg"
      lat={36.8400}
      lng={28.6350}
      mapIcon="🧖"
    />
  );
}
