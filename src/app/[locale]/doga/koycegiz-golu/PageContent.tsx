'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="koycegiz"
      sectionKeys={['overview', 'ecology', 'activities']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-riverside-terrace.jpg"
    />
  );
}
