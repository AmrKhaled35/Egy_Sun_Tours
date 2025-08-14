import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/sections/ContactForm';
import { siteData } from '@/data/site-data';

export const metadata: Metadata = {
  title: 'Contact Us - Book Your Egyptian Adventure',
  description: 'Get in touch with Egy Sun Tours to plan your perfect Egyptian adventure. Contact us via WhatsApp, email, or our contact form for personalized tour planning.',
  keywords: 'contact Egypt tours, book Egyptian tour, Cairo tour guide contact, Egypt travel planning, WhatsApp tour booking, email tour inquiry',
  openGraph: {
    title: 'Contact Us - Book Your Egyptian Adventure | Egy Sun Tours',
    description: 'Get in touch with Egy Sun Tours to plan your perfect Egyptian adventure. Contact us for personalized tour planning and expert guidance.',
    type: 'website',
    locale: 'en_US',
    siteName: siteData.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Book Your Egyptian Adventure | Egy Sun Tours',
    description: 'Get in touch with Egy Sun Tours to plan your perfect Egyptian adventure. Contact us for personalized tour planning and expert guidance.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}