"use client";
import { useState , useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Users, MapPin, Star, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteData } from '@/data/site-data';

interface Trip {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  image: string;
  category: string;
  highlights: string[];
  timeline: {
    time: string;
    title: string;
    description: string;
    image: string;
  }[];
}

interface TripDetailProps {
  trip: Trip;
}

const TripDetail = ({ trip }: TripDetailProps) => {
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([]);

  useEffect(() => {
    trip.timeline.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTimelineItems(prev => [...prev, index]);
      }, index * 300);
    });
  }, [trip.timeline]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" asChild className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
          <Link href="/trips" className="inline-flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span>Back to All Tours</span>
          </Link>
        </Button>
      </div>
      <section className="relative">
        <div className="aspect-[21/9] relative">
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <div className="mb-4">
                <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {trip.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {trip.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {trip.shortDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{trip.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={20} className="text-yellow-400" />
                  <span>5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Experience
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {trip.fullDescription}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {trip.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-in">
              <Card className="sticky top-8 shadow-xl border border-amber-100">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {trip.price}
                    </div>
                    <p className="text-gray-600">per person</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{trip.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-medium">Small Groups</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-medium">English, Arabic</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white mb-4"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in booking the ${trip.title} tour. Can you provide more details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2"
                    >
                      <MessageCircle size={20} />
                      <span>Book via WhatsApp</span>
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                    asChild
                  >
                    <Link href="/contact">
                      Get More Information
                    </Link>
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Free cancellation up to 24 hours before the tour
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey Timeline
            </h2>
            <p className="text-xl text-gray-600">
              Follow the detailed itinerary of your amazing experience
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-amber-200 h-full hidden lg:block"></div>
            
            {trip.timeline.map((item, index) => (
              <div 
                key={index} 
                className={`relative mb-16 transition-all duration-700 ${
                  visibleTimelineItems.includes(index) 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
              >
                <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2 lg:px-8">
                    <Card className="shadow-lg border border-amber-100">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {item.time}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="lg:w-1/2 lg:px-8 mt-6 lg:mt-0">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for This Amazing Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book now and create unforgettable memories in Egypt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-amber-600 hover:bg-gray-100"
              asChild
            >
              <a 
                href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I want to book the ${trip.title} tour. Please send me the details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Book Now via WhatsApp</span>
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-amber-600"
              asChild
            >
              <Link href="/contact">
                Ask Questions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TripDetail;