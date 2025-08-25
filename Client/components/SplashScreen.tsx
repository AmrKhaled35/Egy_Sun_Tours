"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 800);
    const timer2 = setTimeout(() => setShowSubtitle(true), 1800);
    const timer3 = setTimeout(() => setFadeOut(true), 7000);
    const timer4 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://wallpapers.com/images/hd/ancient-egypt-lu2bnz4wnu5a34kl.jpg"
          alt="Ancient Egyptian Pyramids"
          fill
          className="object-cover w-full h-full brightness-75 contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <div
          className={`transition-all duration-1000 transform ${
            showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-bold mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent
            text-6xl sm:text-6xl md:text-7xl lg:text-7xl leading-snug sm:leading-tight">
            <span className="font-serif tracking-wide">Egy Sun</span>
            <br />
            <span className="font-sans tracking-widest text-5xl sm:text-5xl md:text-6xl lg:text-6xl">
              TOURS
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 transform ${
            showSubtitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-200 font-light tracking-wide max-w-xl mx-auto">
            Discover the Wonders of Ancient Egypt
          </p>
          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </div>

        <div
          className={`mt-10 sm:mt-12 transition-all duration-1000 ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
