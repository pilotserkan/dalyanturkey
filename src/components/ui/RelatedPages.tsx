'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface RelatedPage {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
}

export default function RelatedPages({ pages }: RelatedPagesProps) {
  const t = useTranslations('hub');

  if (!pages.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* Section title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {t('relatedPages')}
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-2xl mb-3 block">{page.icon}</span>
              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sky-700 transition-colors">
                {page.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
