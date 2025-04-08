import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DonateButton from '../../components/common/DonateButton';

interface NavigationProps {
  lang: string;
}

/**
 * Navigation component
 * Responsive header with logo, menu items, and language toggle
 * Implements sticky behavior on scroll
 * 
 * @param {NavigationProps} props - Component props
 * @returns {JSX.Element} Rendered navigation
 */
const Navigation: React.FC<NavigationProps> = ({ lang }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to make the navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items
  const menuItems = [
    { label: 'About Us', href: `/${lang}/about` },
    { label: 'Our Work', href: `/${lang}/our-work` },
    { label: 'Donate', href: `/${lang}/donate` },
    { label: 'Emergency Appeals', href: `/${lang}/campaigns` },
    { label: 'Contact', href: `/${lang}/contact` },
  ];

  // Toggle language between English and Arabic
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    // Get the current path without the language prefix
    const path = window.location.pathname.replace(/^\/(en|ar)/, '');
    window.location.href = `/${newLang}${path}`;
  };

  return (
    <header 
      className={`w-full py-4 bg-white ${
        isSticky ? 'fixed top-0 shadow-md z-50 transition-all duration-300' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Qatarat Gaza Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-palestine-red transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center text-gray-800 hover:text-palestine-red transition-colors"
              aria-label="Toggle language"
            >
              <span className="mr-1">{lang === 'en' ? 'العربية' : 'English'}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5h12M9 3v4m1.5-2h-3M3 10h18M3 14h12m6 0l-3-3m0 6l3-3" 
                />
              </svg>
            </button>
            
            {/* Donate Button */}
            <DonateButton size="sm" className="ml-4" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-800 hover:text-palestine-red transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center text-gray-800 hover:text-palestine-red transition-colors py-2"
                aria-label="Toggle language"
              >
                <span className="mr-1">{lang === 'en' ? 'العربية' : 'English'}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5h12M9 3v4m1.5-2h-3M3 10h18M3 14h12m6 0l-3-3m0 6l3-3" 
                  />
                </svg>
              </button>
              
              {/* Donate Button */}
              <DonateButton size="sm" className="self-start" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
