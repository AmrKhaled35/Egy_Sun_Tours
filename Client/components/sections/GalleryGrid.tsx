"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { galleryImages2 } from "@/data/site-data";

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    galleryImages2.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 100);
    });
  }, []);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages2.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + galleryImages2.length) % galleryImages2.length
      );
    }
  };

  const getSrc = (image: string | StaticImageData) => {
    return typeof image === "string" ? image : (image as StaticImageData).src;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <div className="aspect-[21/15] md:aspect-[21/9] lg:aspect-[21/6] relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://wallpapers.com/images/hd/ancient-egypt-lu2bnz4wnu5a34kl.jpg"
              alt="Explore Egypt Photo & Video Gallery"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Photo & Video Gallery
                </h1>
                <p className="text-sm md:text-xl lg:text-2xl mb-6 max-w-3xl">
                  Experience the magic of Egypt through stunning visuals from our unforgettable tours
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages2.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 break-inside-avoid mb-6 ${
                visibleImages.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square">
                {item.type === 'video' ? (
                  <>
                    <video
                      src={getSrc(item.image)}
                      className="object-cover w-full h-full"
                      controls
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
                {galleryImages2[selectedImage].type === "video" ? (
                  <video
                    src={getSrc(galleryImages2[selectedImage].image)}
                    className="object-contain w-full h-full"
                    controls
                  />
                ) : (
                  <Image
                    src={galleryImages2[selectedImage].image}
                    alt={galleryImages2[selectedImage].alt}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-4 z-10">
                <p className="text-white text-lg font-medium">
                  {galleryImages2[selectedImage].alt}
                </p>
                <p className="text-white/80 text-sm">
                  Category: {galleryImages2[selectedImage].category}
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
