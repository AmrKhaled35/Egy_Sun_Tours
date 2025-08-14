import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReviewsGrid from '@/components/sections/ReviewsGrid';
import { siteData } from '@/data/site-data';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials - Egypt Tours',
  description: 'Read authentic reviews and testimonials from travelers who experienced unforgettable Egyptian tours with Egy Sun Tours. See what our guests say about their adventures.',
  keywords: 'Egypt tour reviews, tourist testimonials Egypt, Cairo tour feedback, pyramid tour reviews, TripAdvisor Egypt tours, customer experiences Egypt',
  openGraph: {
    title: 'Customer Reviews & Testimonials - Egypt Tours | Egy Sun Tours',
    description: 'Read authentic reviews and testimonials from travelers who experienced unforgettable Egyptian tours with Egy Sun Tours.',
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews & Testimonials - Egypt Tours | Egy Sun Tours',
    description: 'Read authentic reviews and testimonials from travelers who experienced unforgettable Egyptian tours with Egy Sun Tours.',
  },
  alternates: {
    canonical: '/reviews',
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <ReviewsGrid />
      </div>
      <Footer />
    </main>
  );
}