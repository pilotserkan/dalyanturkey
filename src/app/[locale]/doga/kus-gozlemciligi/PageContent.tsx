'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="kusGozlem"
      sectionKeys={['overview', 'species', 'seasons', 'spots']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
    />
  );
}
