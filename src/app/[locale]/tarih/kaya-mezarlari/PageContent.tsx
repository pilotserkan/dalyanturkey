'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="tarih"
      pageKey="kayaMezarlari"
      sectionKeys={['intro', 'notKings', 'architecture', 'unfinished', 'sunset', 'visiting']}
      hubSlug="tarih"
      backgroundImage="/images/rock-tombs-night.jpg"
    />
  );
}
