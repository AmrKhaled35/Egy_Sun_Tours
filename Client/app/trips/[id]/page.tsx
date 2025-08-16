import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TripDetail from '@/components/sections/TripDetail';
import { allTrips } from '@/data/trips-data';
import { siteData } from '@/data/site-data';

interface TripPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const trip = allTrips.find(t => t.id === parseInt(params.id));
  
  if (!trip) {
    return {
      title: 'Trip Not Found',
    };
  }

  return {
    title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
    description: trip.fullDescription,
    keywords: `${trip.title}, Egypt tour, ${trip.category} tour, Cairo tours, guided tour Egypt, ${trip.highlights.join(', ')}`,
    openGraph: {
      title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
      description: trip.fullDescription,
      type: 'article',
      locale: 'en_US',
      siteName: siteData.name,
      images: [
        {
          url: trip.image,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
      description: trip.shortDescription,
    },
    alternates: {
      canonical: `/trips/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return allTrips.map((trip) => ({
    id: trip.id.toString(),
  }));
}

export default function TripPage({ params }: TripPageProps) {
  const trip = allTrips.find(t => t.id === parseInt(params.id));

  if (!trip) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <TripDetail trip={trip} />
      </div>
      <Footer />
    </main>
  );
}