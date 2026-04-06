'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="wellness"
      pageKey="sultaniye"
      sectionKeys={['intro', 'ancient', 'benefits', 'experience']}
      hubSlug="wellness"
      backgroundImage="/images/dalyan-riverside.jpg"
    />
  );
}
