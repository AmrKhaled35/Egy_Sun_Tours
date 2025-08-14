"use client";
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, MapPin, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: number;
  name: string;
  username: string;
  rating: number;
  title: string;
  fullText: string;
  date: string;
  location: string;
  tourType: string;
}

interface ReviewDetailProps {
  review: Review;
}

const ReviewDetail = ({ review }: ReviewDetailProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in">
          <Button variant="outline" asChild className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
            <Link href="/reviews" className="inline-flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to All Reviews</span>
            </Link>
          </Button>
        </div>

        {/* Review Card */}
        <Card className="shadow-xl border border-amber-100 animate-fade-in">
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {renderStars(review.rating)}
                <span className="ml-3 text-lg font-medium text-gray-600">({review.rating}/5)</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {review.title}
              </h1>
              
              {/* Review Meta */}
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-amber-600" />
                  <span className="font-medium">{review.name}</span>
                  <span className="text-sm">(@{review.username})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-amber-600" />
                  <span>{review.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-amber-600" />
                  <span>{review.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag size={18} className="text-amber-600" />
                  <span>{review.tourType}</span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {review.fullText}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-amber-100">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-500">
                  This review was originally posted on TripAdvisor
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/reviews">View More Reviews</Link>
                  </Button>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
                    <Link href="/contact">Book Your Tour</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Reviews CTA */}
        <div className="mt-12 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Share Your Experience?
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear about your Egyptian adventure! Leave us a review on TripAdvisor.
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <a 
              href="https://www.tripadvisor.com/Attraction_Review-g294201-d19060269-Reviews-Egy_Sun_Tours-Cairo_Cairo_Governorate.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Write a Review on TripAdvisor
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;