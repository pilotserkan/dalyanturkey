'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="saklikentTlosTuru"
      sectionKeys={['overview', 'saklikent', 'tlos']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-mountain.jpg"
    />
  );
}
