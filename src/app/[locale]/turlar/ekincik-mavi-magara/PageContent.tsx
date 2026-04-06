'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="ekincikMaviMagara"
      sectionKeys={['overview', 'blueCave', 'ekincik']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-blue-boat.jpg"
    />
  );
}
