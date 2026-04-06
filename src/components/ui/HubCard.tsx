'use client';

import Link from 'next/link';

interface HubCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  imageUrl?: string;
}

const COLOR_MAP: Record<
  string,
  { bar: string; bg: string; text: string }
> = {
  amber:   { bar: 'after:bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700' },
  emerald: { bar: 'after:bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  rose:    { bar: 'after:bg-rose-500',    bg: 'bg-rose-50',    text: 'text-rose-700' },
  sky:     { bar: 'after:bg-sky-500',     bg: 'bg-sky-50',     text: 'text-sky-700' },
  orange:  { bar: 'after:bg-orange-500',  bg: 'bg-orange-50',  text: 'text-orange-700' },
  slate:   { bar: 'after:bg-slate-500',   bg: 'bg-slate-50',   text: 'text-slate-700' },
};

export default function HubCard({
  title,
  description,
  icon,
  href,
  color,
  imageUrl,
}: HubCardProps) {
  const colors = COLOR_MAP[color] ?? COLOR_MAP.sky;

  return (
    <Link href={href} className="block">
      <article className={`hub-card h-full ${colors.bar}`}>
        {/* Optional image */}
        {imageUrl && (
          <div className="h-40 overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        <div className="p-6">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl mb-4`}
          >
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-700 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Learn More link */}
          <span
            className={`inline-flex items-center text-sm font-medium ${colors.text} group-hover:gap-2 transition-all`}
          >
            Learn More
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
