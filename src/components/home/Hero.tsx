import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DonateButton from '@/components/common/DonateButton';

interface HeroProps {
  lang: string;
}

// Define hero banner images - these will rotate
const heroBanners = [
  {
    id: 1,
    image: '/images/hero/hero-1.jpg',
    alt: 'Children in Gaza receiving aid',
  },
  {
    id: 2,
    image: '/images/hero/hero-2.jpg',
    alt: 'Humanitarian aid distribution in Gaza',
  },
  {
    id: 3,
    image: '/images/hero/hero-3.jpg',
    alt: 'Clean water project in Gaza',
  }
];

/**
 * Hero component
 * Displays a rotating banner of images with overlaid text and CTA
 * 
 * @param {HeroProps} props - Component props
 * @returns {JSX.Element} - Rendered hero section
 */
const Hero: React.FC<HeroProps> = ({ lang }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-[600px] w-full">
      {/* Rotating Banners */}
      {heroBanners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          Bringing Hope to Gaza, One Drop at a Time
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Join us in providing humanitarian aid, clean water, and sustainable solutions to communities in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <DonateButton size="lg" lang={lang} />
          <a 
            href="#featured-campaigns"
            className="bg-white hover:bg-gray-100 text-palestine-red font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Banner Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {heroBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentBanner ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
