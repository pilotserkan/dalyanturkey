'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="pratik"
      pageKey="surdurulebilirTurizm"
      sectionKeys={['overview', 'wildlife', 'howToHelp', 'localInitiatives', 'responsibleTravel']}
      hubSlug="pratik"
      backgroundImage="/images/dalyan-nature-path.jpg"
      lat={36.8333}
      lng={28.6333}
      mapIcon="🌿"
    />
  );
}
