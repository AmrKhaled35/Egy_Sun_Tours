"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, MapPin, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { allTrips } from "@/data/trips-data";

const TripsGrid = () => {
  const [visibleTrips, setVisibleTrips] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(allTrips.map((trip) => trip.category))),
  ];
  const filteredTrips =
    selectedCategory === "All"
      ? allTrips
      : allTrips.filter((trip) => trip.category === selectedCategory);

  useEffect(() => {
    setVisibleTrips([]);
    filteredTrips.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTrips((prev) => [...prev, index]);
      }, index * 150);
    });
  }, [selectedCategory, filteredTrips]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl 
                    aspect-[21/15] md:aspect-[21/9] lg:aspect-[21/6]"
            >
              <Image
                src="https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg"
                alt="Discover Egypt Tours and Experiences"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <h1 className="text-4xl min-[400px]:text-5xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Egypt Tours & Experiences
                  </h1>
                  <p className="text-sm md:text-xl lg:text-2xl mb-6 max-w-2xl md:max-w-3xl mx-auto">
                    Discover the wonders of ancient Egypt with our expertly
                    crafted tours and unforgettable experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <Filter size={16} className="mr-2" />
              {category}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, index) => (
            <Card
              key={trip.id}
              className={`group hover:shadow-2xl transition-all duration-500 border border-amber-100 overflow-hidden ${
                visibleTrips.includes(index)
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {trip.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-amber-200 transition-colors">
                    {trip.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {trip.shortDescription}
                </p>

                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-amber-600" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-amber-600" />
                    <span>{trip.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-amber-600" />
                    <span>{trip.highlights.length} highlights included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {trip.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {trip.highlights.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{trip.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white group"
                    asChild
                  >
                    <Link
                      href={`/trips/${trip.id}`}
                      className="inline-flex items-center justify-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No tours found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TripsGrid;
