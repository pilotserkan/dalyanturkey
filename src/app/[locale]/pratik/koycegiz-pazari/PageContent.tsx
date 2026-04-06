'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="pratik"
      pageKey="koycegizPazari"
      sectionKeys={['overview', 'whatToBuy', 'gettingThere', 'tips']}
      hubSlug="pratik"
      backgroundImage="/images/dalyan-town-night.jpg"
    />
  );
}
