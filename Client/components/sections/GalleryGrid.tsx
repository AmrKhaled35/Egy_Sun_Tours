"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    alt: "Great Pyramids of Giza at sunset",
    category: "Pyramids",
    type: "image"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5935658/pexels-photo-5935658.jpeg",
    alt: "Ancient Egyptian hieroglyphs on temple walls",
    category: "Temples",
    type: "image"
  },
  {
    id: 3,
    image: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    alt: "Ancient Egyptian temple tour video",
    category: "Temples",
    type: "video"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3290073/pexels-photo-3290073.jpeg",
    alt: "Egyptian desert landscape with ancient ruins",
    category: "Desert",
    type: "image"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/5935751/pexels-photo-5935751.jpeg",
    alt: "Luxor Temple columns and architecture",
    category: "Temples",
    type: "image"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/3290074/pexels-photo-3290074.jpeg",
    alt: "Ancient Egyptian artifacts and treasures",
    category: "Artifacts",
    type: "image"
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg",
    alt: "Nile River cruise boat at sunset",
    category: "Nile",
    type: "image"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg",
    alt: "Traditional Egyptian felucca sailing on the Nile",
    category: "Nile",
    type: "image"
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg",
    alt: "Valley of the Kings tomb entrance",
    category: "Tombs",
    type: "image"
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    alt: "Cairo Islamic architecture and mosques",
    category: "Islamic",
    type: "image"
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/5935658/pexels-photo-5935658.jpeg",
    alt: "Egyptian Museum artifacts display",
    category: "Museums",
    type: "image"
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/5712301/pexels-photo-5712301.jpeg",
    alt: "Red Sea coral reef diving experience",
    category: "Red Sea",
    type: "image"
  },
];

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    // Animate images appearing one by one
    galleryImages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
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
      setSelectedImage(
        (selectedImage - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="aspect-[21/6] relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
              alt="Explore Egypt Photo & Video Gallery"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Photo & Video Gallery
                </h1>
                <p className="text-xl md:text-2xl mb-6 max-w-3xl">
                  Experience the magic of Egypt through stunning visuals from our unforgettable tours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 break-inside-avoid mb-6 ${
                visibleImages.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className={`relative ${ 'aspect-square'}`}>
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors">
                        <Play className="text-white w-8 h-8" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{item.category}</p>
                  <p className="text-white/80 text-xs">{item.type === 'video' ? 'Video' : 'Photo'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
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
                {galleryImages[selectedImage].type === "video" ? (
                  <video
                    src={galleryImages[selectedImage].image}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={galleryImages[selectedImage].image}
                    alt={galleryImages[selectedImage].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-4 z-10">
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
