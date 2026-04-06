'use client';

interface ContentSectionProps {
  title: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  reverse?: boolean;
  id: string;
}

export default function ContentSection({
  title,
  content,
  imageUrl,
  imageAlt,
  reverse = false,
  id,
}: ContentSectionProps) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <section id={id} className="py-12 md:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 lg:gap-12 items-start ${
            imageUrl ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {/* Text content */}
          <div className={`${imageUrl && reverse ? 'lg:order-2' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-6">
              <a href={`#${id}`} className="hover:underline">
                {title}
              </a>
            </h2>

            <div className="content-article">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image */}
          {imageUrl && (
            <div
              className={`${reverse ? 'lg:order-1' : ''}`}
            >
              <div className="img-zoom rounded-xl shadow-lg">
                <img
                  src={imageUrl}
                  alt={imageAlt ?? title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
