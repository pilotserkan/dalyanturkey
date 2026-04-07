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
      lat={36.8667}
      lng={28.6833}
      mapIcon="🌊"
    />
  );
}
