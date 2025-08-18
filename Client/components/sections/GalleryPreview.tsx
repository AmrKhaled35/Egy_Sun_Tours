"use client";
import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { galleryImages } from '@/data/site-data';
import { Button } from '@/components/ui/button';

const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : galleryImages.length - 1) : prev
    );
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev < galleryImages.length - 1 ? prev + 1 : 0) : prev
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Explore Egypt&apos;s <span className="text-amber-600">Wonders</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Journey through ancient monuments, vibrant culture, and breathtaking landscapes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-in shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className={`relative aspect-square`}>
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/gallery" className="inline-flex items-center space-x-2">
              <span>View Full Gallery</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>


        {selectedImage !== null && (
          <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 z-20 transition-colors"
              >
                <X className="text-white" size={24} />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 z-20 transition-colors"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 z-20 transition-colors"
              >
                <ChevronRight className="text-white" size={24} />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[selectedImage].image}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPreview;
