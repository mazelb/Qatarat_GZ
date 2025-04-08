import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

// Define banner types
interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

/**
 * Hero component featuring rotating banners and CTA overlay
 * Provides main visual impact for the homepage
 */
const Hero: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentBanner, setCurrentBanner] = useState(0);

  // Sample banner data - in a real app, this would come from CMS or API
  const banners: Banner[] = [
    {
      id: 1,
      image: '/images/hero/banner1.jpg',
      title: t('hero.banner1.title'),
      subtitle: t('hero.banner1.subtitle'),
    },
    {
      id: 2,
      image: '/images/hero/banner2.jpg',
      title: t('hero.banner2.title'),
      subtitle: t('hero.banner2.subtitle'),
    },
    {
      id: 3,
      image: '/images/hero/banner3.jpg',
      title: t('hero.banner3.title'),
      subtitle: t('hero.banner3.subtitle'),
    },
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Manual banner navigation
  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel/Banner Container */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority
                className="object-cover"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {banners[currentBanner].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {banners[currentBanner].subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/donate"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold text-center transition duration-300"
            >
              {t('donate_now')}
            </Link>
            <Link 
              href="/emergency-appeals"
              className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-md font-bold text-center transition duration-300"
            >
              {t('emergency_appeals')}
            </Link>
          </div>
        </div>
      </div>

      {/* Banner Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <div className="flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
