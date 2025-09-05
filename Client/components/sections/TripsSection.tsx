"use client";
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { allTrips } from '@/data/trips-data';

const TripsSection = () => {
  const [trips] = useLocalStorage('trips', allTrips);
  const featuredTrips = trips.slice(0, 3);
  const [visibleTrips, setVisibleTrips] = useState<number[]>([]);

  useEffect(() => {
    featuredTrips.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTrips(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-16 w-36 h-36 border border-amber-300 rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 border border-amber-300 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-amber-300 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative">
          <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Compass className="w-4 h-4 inline mr-2" />
            Featured Tours
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Popular Tours & <span className="text-amber-600">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover Egypt&apos;s most captivating destinations with our carefully crafted and personalized tours
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredTrips.map((trip, index) => (
            <Card 
              key={trip.id} 
              className={`group hover:shadow-2xl transition-all duration-500 border border-amber-100 overflow-hidden rounded-2xl bg-white ${
                visibleTrips.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="bg-amber-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-amber-400/30">
                    {trip.category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-amber-200 transition-colors leading-tight">
                    {trip.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin size={16} className="mr-2" />
                    <span>Cairo, Egypt</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 text-lg">
                  {trip.shortDescription}
                </p>
                
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white group py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href={`/trips/${trip.id}`} className="inline-flex items-center justify-center space-x-2">
                    <span>Explore Tour</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/trips" className="inline-flex items-center space-x-2">
              <span>View All Tours</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;