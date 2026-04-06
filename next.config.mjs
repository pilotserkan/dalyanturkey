import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/ancient-sites',
        destination: '/:locale/tarih',
        permanent: true,
      },
      {
        source: '/:locale/boat-tours',
        destination: '/:locale/turlar',
        permanent: true,
      },
      {
        source: '/:locale/iztuzu-beach',
        destination: '/:locale/doga/iztuzu-plaji',
        permanent: true,
      },
      {
        source: '/:locale/map',
        destination: '/:locale/harita',
        permanent: true,
      },
      {
        source: '/:locale/about',
        destination: '/:locale/hakkinda/dalyan-nerede',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
