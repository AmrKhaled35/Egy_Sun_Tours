"use client";
import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/site-data';

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Egypt's Wonders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Journey through ancient monuments, vibrant culture, and breathtaking landscapes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            </div>
          ))}
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
