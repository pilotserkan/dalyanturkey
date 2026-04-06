'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="iztuzuSuTaksi"
      sectionKeys={['overview', 'beach', 'schedule']}
      hubSlug="turlar"
      backgroundImage="/images/dalyan-river-boats.jpg"
    />
  );
}
