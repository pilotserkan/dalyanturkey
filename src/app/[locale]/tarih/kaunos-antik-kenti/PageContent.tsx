'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="tarih"
      pageKey="kaunos"
      sectionKeys={['intro', 'carian', 'persian', 'hellenistic', 'roman', 'byzantine', 'sites', 'excavations']}
      hubSlug="tarih"
      backgroundImage="/images/rock-tombs-river-night.jpg"
      lat={36.8261}
      lng={28.6183}
      mapIcon="🏛️"
    />
  );
}
