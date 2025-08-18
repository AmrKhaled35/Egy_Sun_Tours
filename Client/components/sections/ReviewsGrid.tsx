"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink, Calendar, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allReviews } from "@/data/reviews-data";
import { siteData } from "@/data/site-data";

const ReviewsGrid = () => {
  const [visibleReviews, setVisibleReviews] = useState<number[]>([]);

  useEffect(() => {
    // Animate reviews appearing one by one
    allReviews.forEach((_, index) => {
      setTimeout(() => {
        setVisibleReviews((prev) => [...prev, index]);
      }, index * 150);
    });
  }, []);

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
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative mb-16 ">
          <div className="aspect-[21/6] relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3290074/pexels-photo-3290074.jpeg"
              alt="Customer Reviews and Testimonials"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Customer Reviews
                </h1>
                <p className="text-xl md:text-2xl mb-6 max-w-3xl">
                  Real experiences from travelers who discovered Egypt with us
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.map((review, index) => (
            <Card
              key={review.id}
              className={`hover:shadow-xl transition-all duration-500 border border-amber-100 ${
                visibleReviews.includes(index)
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({review.rating}/5)
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2">
                  {review.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  "{review.excerpt}"
                </p>

                {/* Tour Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} />
                    <span>{review.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* Author and Read More */}
                <div className="border-t border-amber-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-amber-600" />
                      <span className="font-medium text-gray-900">
                        {review.name}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                      asChild
                    >
                      <Link href={`/reviews/${review.id}`}>
                        Read Full Review
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Amazing Experience?
          </h2>
          <p className="text-gray-600 mb-6">
            Join hundreds of satisfied travelers who have discovered the magic
            of Egypt with our expert guides.
          </p>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            asChild
          >
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsGrid;
