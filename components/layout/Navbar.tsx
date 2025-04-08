import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MobileMenu } from './MobileMenu';
import LanguageToggle from './LanguageToggle';

/**
 * Navbar component provides the main navigation for the site
 * Features:
 * - Sticky on scroll
 * - Mobile responsive with hamburger menu
 * - Language toggle
 * - Prominent Donate CTA
 */
const Navbar: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="Qatarat GZ" 
            width={120} 
            height={40} 
            className="h-10 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/about" 
            className="text-gray-800 hover:text-green-700 font-medium"
          >
            {t('about_us')}
          </Link>
          <Link 
            href="/our-work" 
            className="text-gray-800 hover:text-green-700 font-medium"
          >
            {t('our_work')}
          </Link>
          <Link 
            href="/donate" 
            className="text-gray-800 hover:text-green-700 font-medium"
          >
            {t('donate')}
          </Link>
          <Link 
            href="/emergency-appeals" 
            className="text-gray-800 hover:text-green-700 font-medium"
          >
            {t('emergency_appeals')}
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-800 hover:text-green-700 font-medium"
          >
            {t('contact')}
          </Link>
          
          {/* Language Toggle */}
          <LanguageToggle />
          
          {/* Donate Now CTA */}
          <Link 
            href="/donate" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold transition duration-300"
          >
            {t('donate_now')}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <LanguageToggle />
          <button 
            onClick={toggleMobileMenu}
            className="ml-4 text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
