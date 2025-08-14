"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    alt: "Great Pyramids of Giza at sunset",
    category: "Pyramids"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5935658/pexels-photo-5935658.jpeg",
    alt: "Ancient Egyptian hieroglyphs on temple walls",
    category: "Temples"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/5712301/pexels-photo-5712301.jpeg",
    alt: "The Great Sphinx of Giza",
    category: "Monuments"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3290073/pexels-photo-3290073.jpeg",
    alt: "Egyptian desert landscape with ancient ruins",
    category: "Desert"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/5935751/pexels-photo-5935751.jpeg",
    alt: "Luxor Temple columns and architecture",
    category: "Temples"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/3290074/pexels-photo-3290074.jpeg",
    alt: "Ancient Egyptian artifacts and treasures",
    category: "Artifacts"
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg",
    alt: "Nile River cruise boat at sunset",
    category: "Nile"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg",
    alt: "Traditional Egyptian felucca sailing on the Nile",
    category: "Nile"
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg",
    alt: "Valley of the Kings tomb entrance",
    category: "Tombs"
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    alt: "Cairo Islamic architecture and mosques",
    category: "Islamic"
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/5935658/pexels-photo-5935658.jpeg",
    alt: "Egyptian Museum artifacts display",
    category: "Museums"
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/5712301/pexels-photo-5712301.jpeg",
    alt: "Red Sea coral reef diving experience",
    category: "Red Sea"
  }
];

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    // Animate images appearing one by one
    galleryImages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the breathtaking beauty of ancient Egypt through our curated collection of photographs from unforgettable tours and experiences.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                visibleImages.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 z-10 transition-colors"
              >
                <X className="text-white" size={24} />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <ChevronRight className="text-white" size={24} />
              </button>

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[selectedImage].image}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-4">
                <p className="text-white text-lg font-medium">
                  {galleryImages[selectedImage].alt}
                </p>
                <p className="text-white/80 text-sm">
                  Category: {galleryImages[selectedImage].category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;