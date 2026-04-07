'use client';

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage: string;
  gradient?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  badge,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden">
      {/* Background image - full coverage */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Multi-layer gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Breadcrumb - positioned below fixed header */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="absolute top-20 md:top-24 left-4 md:left-8 z-10"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-white/70">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <svg className="w-3 h-3 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Main content - pushed down for header clearance */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 pt-32 md:pt-40 max-w-5xl mx-auto">
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/90 text-white text-xs sm:text-sm font-bold mb-4 tracking-wide uppercase shadow-lg animate-fade-in">
            {badge}
          </span>
        )}

        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight animate-fade-in-up"
          style={{ textShadow: '0 3px 16px rgba(0,0,0,0.5)' }}
        >
          {title}
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-amber-200/90 mb-3 max-w-3xl font-medium animate-fade-in-up"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)', animationDelay: '0.1s' }}
        >
          {subtitle}
        </p>

        {description && (
          <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
