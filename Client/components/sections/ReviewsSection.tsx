"use client";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reviews, siteData } from "@/data/site-data";

const ReviewsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-t from-white to-amber-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-amber-100 text-amber-700 px-5 py-2 rounded-full shadow-md">
              <Star className="w-6 h-6 mr-2 text-amber-600" />
              <span className="font-semibold text-lg">Traveler Reviews</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            What Our <span className="text-amber-600">Travelers</span> Say
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from travelers who discovered Egypt with us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className="hover:shadow-lg transition-shadow duration-300 animate-fade-in border border-amber-100"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {review.title}
                </h3>

                {/* Review Text */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  &quot;{review.text}&quot;
                </p>

                {/* Author and Date */}
                <div className="border-t border-amber-100 pt-4">
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to TripAdvisor */}
        <div className="text-center animate-fade-in">
          <p className="text-gray-600 mb-6">
            See all 161 reviews on TripAdvisor
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <a
              href={siteData.contact.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2"
            >
              <span>View on TripAdvisor</span>
              <ExternalLink size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
