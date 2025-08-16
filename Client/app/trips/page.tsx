import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TripsGrid from '@/components/sections/TripsGrid';
import { siteData } from '@/data/site-data';

export const metadata: Metadata = {
  title: 'Egypt Tours & Experiences - Discover Ancient Wonders',
  description: 'Explore our carefully curated collection of Egypt tours and experiences. From pyramid adventures to Nile cruises, discover the best of ancient Egypt with expert guides.',
  keywords: 'Egypt tours, Cairo tours, pyramid tours, Nile cruise, Egyptian experiences, guided tours Egypt, ancient Egypt tours, cultural tours',
  openGraph: {
    title: 'Egypt Tours & Experiences - Discover Ancient Wonders | Egy Sun Tours',
    description: 'Explore our carefully curated collection of Egypt tours and experiences. From pyramid adventures to Nile cruises, discover the best of ancient Egypt.',
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egypt Tours & Experiences - Discover Ancient Wonders | Egy Sun Tours',
    description: 'Explore our carefully curated collection of Egypt tours and experiences. From pyramid adventures to Nile cruises, discover the best of ancient Egypt.',
  },
  alternates: {
    canonical: '/trips',
  },
};

export default function TripsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <TripsGrid />
      </div>
      <Footer />
    </main>
  );
}