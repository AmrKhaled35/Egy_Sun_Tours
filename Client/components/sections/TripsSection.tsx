"use client";
import { useState  , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { featuredTrips } from '@/data/trips-data';

const TripsSection = () => {
  const [visibleTrips, setVisibleTrips] = useState<number[]>([]);

  useEffect(() => {
    featuredTrips.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTrips(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Tours & Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Egypt's most captivating destinations with our carefully crafted tours
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTrips.map((trip, index) => (
            <Card 
              key={trip.id} 
              className={`group hover:shadow-2xl transition-all duration-500 border border-amber-100 overflow-hidden ${
                visibleTrips.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
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
                
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white group"
                  asChild
                >
                  <Link href={`/trips/${trip.id}`} className="inline-flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center animate-fade-in">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8"
            asChild
          >
            <Link href="/trips">
              View All Tours
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;