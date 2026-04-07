'use client';

import ContentPageTemplate from '@/components/ui/ContentPageTemplate';

export default function PageContent() {
  return (
    <ContentPageTemplate
      namespace="yemeIcme"
      pageKey="dalyanMutfagi"
      sectionKeys={['seafood', 'oliveOil', 'wildHerbs', 'breakfast', 'desserts', 'drinks', 'restaurantTypes']}
      hubSlug="yeme-icme"
      backgroundImage="/images/dalyan-river-view.jpg"
      lat={36.8345}
      lng={28.6320}
      mapIcon="🍽️"
    />
  );
}
