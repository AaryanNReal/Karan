'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

const Hero = () => {
  const [firebaseImages, setFirebaseImages] = useState<{ imageUrl: string }[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch images from Firebase Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "heroImages"));
        const imagesData = querySnapshot.docs.map(doc => doc.data() as { imageUrl: string });
        setFirebaseImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // Auto-advance slides when images are available
  useEffect(() => {
    if (firebaseImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % firebaseImages.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [firebaseImages]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % firebaseImages.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + firebaseImages.length) % firebaseImages.length);
  };

  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full">
          {firebaseImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                alt={`Slide ${index + 1}`}
                src={image.imageUrl}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute z-10 left-4 right-4 bottom-8 flex justify-between">
          <button 
            onClick={goToPrev}
            className="relative left-0 bg-black/20 hover:bg-black/40 border-0 text-white p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          
          <div className="flex gap-2 items-center">
            {firebaseImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === index ? 'bg-yellow-500 scale-110' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={goToNext}
            className="relative right-0 bg-black/20 hover:bg-black/40 border-0 text-white p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Content with margins */}
      <div className="container relative z-10 mt-10 mx-10 text-white">
        <div className="max-w-2xl space-y-6">
          <h2 className="text-xl md:text-2xl uppercase tracking-widest mb-2 font-montserrat text-yellow-500">
            Premium Design Solutions
          </h2>
          <h1 className="font-montserrat font-semibold text-4xl md:text-5xl lg:text-6xl">
            Crafting Timeless Interiors For Modern Living
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-xl">
            Transforming spaces into elegant, functional environments that reflect your unique style and personality.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors">
              Explore Our Work
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors border border-white">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;