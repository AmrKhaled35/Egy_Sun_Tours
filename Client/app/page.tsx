import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import HeroSlider from '@/components/sections/HeroSlider';
import GalleryPreview from '@/components/sections/GalleryPreview';
import ReviewsSection from '@/components/sections/ReviewsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import { siteData } from '@/data/site-data';

export const metadata: Metadata = {
  title: `${siteData.name} - ${siteData.tagline}`,
  description: siteData.description,
  keywords: 'Egypt tours, Cairo tours, pyramid tours, Nile cruise, Egyptian culture, tourist guide Egypt',
  openGraph: {
    title: `${siteData.name} - ${siteData.tagline}`,
    description: siteData.description,
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
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
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <GalleryPreview />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}