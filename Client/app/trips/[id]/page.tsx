import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TripDetail from "@/components/sections/TripDetail";
import { siteData } from "@/data/site-data";
interface TripPageProps {
  params: {
    id: string;
  };
}
export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const res = await fetch(`http://127.0.0.1:8000/api/trips/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      title: "Trip Not Found",
    };
  }
  const trip = await res.json();
  return {
    title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
    description: trip.fullDescription || trip.shortDescription,
    keywords: `${trip.title}, Egypt tour, ${trip.category} tour, Cairo tours, guided tour Egypt, ${(trip.highlights || []).join(", ")}`,
    openGraph: {
      title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
      description: trip.fullDescription || trip.shortDescription,
      type: "article",
      locale: "en_US",
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
      card: "summary_large_image",
      title: `${trip.title} - Egypt Tour Details | Egy Sun Tours`,
      description: trip.shortDescription,
    },
    alternates: {
      canonical: `/trips/${params.id}`,
    },
  };
}
export async function generateStaticParams() {
  const res = await fetch("http://127.0.0.1:8000/api/trips", {
    cache: "no-store",
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  const trips = Array.isArray(data) ? data : data.results || [];

  return trips.map((trip: any) => ({
    id: trip.id.toString(),
  }));
}
export default async function TripPage({ params }: TripPageProps) {
  const res = await fetch(`http://127.0.0.1:8000/api/trips/${params.id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    notFound();
  }
  const trip = await res.json();
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
