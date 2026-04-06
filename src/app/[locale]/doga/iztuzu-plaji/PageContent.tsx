'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="doga"
      pageKey="iztuzu"
      sectionKeys={['overview', 'rescued', 'caretta', 'rules', 'dekamer', 'gettingThere']}
      hubSlug="doga"
      backgroundImage="/images/dalyan-mountain.jpg"
    />
  );
}
