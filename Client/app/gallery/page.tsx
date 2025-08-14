import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GalleryGrid from '@/components/sections/GalleryGrid';
import { siteData } from '@/data/site-data';

export const metadata: Metadata = {
  title: 'Photo Gallery - Egyptian Tours & Ancient Monuments',
  description: 'Explore our stunning photo gallery showcasing the beauty of ancient Egypt, pyramids, temples, and unforgettable tour experiences with Egy Sun Tours.',
  keywords: 'Egypt photo gallery, pyramid photos, ancient Egypt images, Cairo tours photos, Egyptian monuments, tourist photos Egypt',
  openGraph: {
    title: 'Photo Gallery - Egyptian Tours & Ancient Monuments | Egy Sun Tours',
    description: 'Explore our stunning photo gallery showcasing the beauty of ancient Egypt, pyramids, temples, and unforgettable tour experiences.',
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery - Egyptian Tours & Ancient Monuments | Egy Sun Tours',
    description: 'Explore our stunning photo gallery showcasing the beauty of ancient Egypt, pyramids, temples, and unforgettable tour experiences.',
  },
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <GalleryGrid />
      </div>
      <Footer />
    </main>
  );
}