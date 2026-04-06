'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="turlar"
      pageKey="kaunosKulturTuru"
      sectionKeys={['overview', 'sites', 'rockTombs']}
      hubSlug="turlar"
      backgroundImage="/images/rock-tombs-river-night.jpg"
    />
  );
}
