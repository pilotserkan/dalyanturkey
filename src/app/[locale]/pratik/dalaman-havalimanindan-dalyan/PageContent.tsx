'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="pratik"
      pageKey="dalamanHavalimani"
      sectionKeys={['overview', 'privateTaxi', 'shuttle', 'publicTransport', 'carRental']}
      hubSlug="pratik"
      backgroundImage="/images/dalyan-town-night.jpg"
    />
  );
}
