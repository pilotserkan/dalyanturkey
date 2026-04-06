import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dalyanturkey.com'),
  title: {
    default: 'Dalyan Turkey - Official Tourism Guide',
    template: '%s | Dalyan Turkey',
  },
  description: 'Discover Dalyan, Turkey\'s hidden paradise. Ancient ruins, pristine beaches, boat tours, and more.',
  openGraph: {
    type: 'website',
    siteName: 'DalyanTurkey.com',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
