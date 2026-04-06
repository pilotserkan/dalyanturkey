'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="gunubirlikGeziler"
      sectionKeys={['overview', 'fethiye', 'kayakoy', 'marmaris']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-river-boats.jpg"
    />
  );
}
