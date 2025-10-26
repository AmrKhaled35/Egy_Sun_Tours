import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReviewDetail from "@/components/sections/ReviewDetail";
import { siteData } from "@/data/site-data";

interface ReviewPageProps {
  params: {
    id: string;
  };
}
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const res = await fetch(`https://egysuntours-production.up.railway.app/api/reviews/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Review Not Found",
    };
  }

  const review = await res.json();

  return {
    title: `${review.title} - Customer Review | Egy Sun Tours`,
    description: review.excerpt || review.fullText?.substring(0, 160),
    keywords: `Egypt tour review, ${review.name}, ${review.tourType}, customer testimonial, TripAdvisor review`,
    openGraph: {
      title: `${review.title} - Customer Review | Egy Sun Tours`,
      description: review.excerpt || review.fullText?.substring(0, 160),
      type: "article",
      locale: "en_US",
      siteName: siteData.name,
    },
    alternates: {
      canonical: `/reviews/${params.id}`,
    },
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const res = await fetch(`https://egysuntours-production.up.railway.app/api/reviews/${params.id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    notFound();
  }

  const review = await res.json();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <ReviewDetail review={review} />
      </div>
      <Footer />
    </main>
  );
}
