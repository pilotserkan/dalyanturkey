'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/ui/PageHero';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-lg font-semibold text-gray-900 pr-4">
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PageContent() {
  const t = useTranslations('pratik');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const questions = t.raw('sikSorulanSorular.questions') as FAQItem[];

  return (
    <div>
      <PageHero
        title={t('sikSorulanSorular.title')}
        subtitle={t('sikSorulanSorular.subtitle')}
        description={t('sikSorulanSorular.heroDescription')}
        backgroundImage="/images/dalyan-town-night.jpg"
        breadcrumbs={[
          { label: nav('home'), href: `/${locale}` },
          { label: nav('pratik'), href: `/${locale}/pratik` },
          { label: t('sikSorulanSorular.title'), href: `/${locale}/pratik/sik-sorulan-sorular` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <FAQAccordion items={questions} />
      </div>
    </div>
  );
}
