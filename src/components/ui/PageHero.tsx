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
  gradient = 'gradient-overlay',
  badge,
  breadcrumbs,
}: PageHeroProps) {

  return (
    <section
      className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div className={gradient} aria-hidden="true" />

      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="absolute top-4 left-4 md:top-6 md:left-8 z-10"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm text-white/80">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-white/50 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 pt-24 max-w-7xl mx-auto">
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4 animate-fade-in-up">
            {badge}
          </span>
        )}

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 animate-fade-in-up"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          {title}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-4 max-w-3xl animate-fade-in-up">
          {subtitle}
        </p>

        {description && (
          <p className="text-base md:text-lg text-white/70 max-w-2xl animate-fade-in-up">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
