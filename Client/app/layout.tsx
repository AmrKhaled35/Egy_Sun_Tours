import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PageTransition from '@/components/layout/PageTransition';
import { siteData } from '@/data/site-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${siteData.name} - ${siteData.tagline}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: 'Egypt tours, Cairo tours, pyramid tours, Nile cruise, Egyptian culture, tourist guide Egypt, ancient Egypt, travel Egypt',
  authors: [{ name: siteData.name }],
  creator: siteData.name,
  publisher: siteData.name,
  metadataBase: new URL('https://egysuntours.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
    title: `${siteData.name} - ${siteData.tagline}`,
    description: siteData.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.name} - ${siteData.tagline}`,
    description: siteData.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#D97706" />
        <link rel="canonical" href="https://egysuntours.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Egy Sun Tours" />
        <meta property="og:locale" content="en_US" />
        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content="Cairo" />
        <meta name="geo.position" content="30.0444;31.2357" />
        <meta name="ICBM" content="30.0444, 31.2357" />
      </head>
      <body className={inter.className}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}