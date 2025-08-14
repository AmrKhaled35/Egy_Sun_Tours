"use client";
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { siteData } from '@/data/site-data';

const AboutSection = () => {
  const highlights = [
    "Over 10 years of guiding experience",
    "Personalized and authentic tours", 
    "Expert knowledge of Egyptian history",
    "Fluent in multiple languages",
    "Licensed professional guide"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Gateway to Ancient Egypt
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed mb-8">
              {siteData.description}
            </div>
            
            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-amber-600 w-5 h-5" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-100 p-6 rounded-lg">
              <p className="text-amber-800 font-medium text-lg italic">
                "Let us help you create memories that will last a lifetime!"
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in lg:order-first">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3290074/pexels-photo-3290074.jpeg"
                  alt="Professional tour guide at Egyptian monuments"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;