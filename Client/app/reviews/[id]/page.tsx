import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReviewDetail from '@/components/sections/ReviewDetail';
import { allReviews } from '@/data/reviews-data';
import { siteData } from '@/data/site-data';

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = allReviews.find(r => r.id === parseInt(params.id));
  
  if (!review) {
    return {
      title: 'Review Not Found',
    };
  }

  return {
    title: `${review.title} - Customer Review | Egy Sun Tours`,
    description: review.excerpt,
    keywords: `Egypt tour review, ${review.name}, ${review.tourType}, customer testimonial, TripAdvisor review`,
    openGraph: {
      title: `${review.title} - Customer Review | Egy Sun Tours`,
      description: review.excerpt,
      type: 'article',
      locale: 'en_US',
      siteName: siteData.name,
    },
    alternates: {
      canonical: `/reviews/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return allReviews.map((review) => ({
    id: review.id.toString(),
  }));
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const review = allReviews.find(r => r.id === parseInt(params.id));

  if (!review) {
    notFound();
  }

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