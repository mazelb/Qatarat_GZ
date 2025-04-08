import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu component provides navigation for small screens
 * Appears as a slide-in panel when the hamburger icon is clicked
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop with click away functionality */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="p-5 h-full flex flex-col">
          {/* Close button */}
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="mt-8 flex flex-col space-y-5">
            <Link 
              href="/about" 
              className="text-gray-800 hover:text-green-700 font-medium py-2"
              onClick={onClose}
            >
              {t('about_us')}
            </Link>
            <Link 
              href="/our-work" 
              className="text-gray-800 hover:text-green-700 font-medium py-2"
              onClick={onClose}
            >
              {t('our_work')}
            </Link>
            <Link 
              href="/donate" 
              className="text-gray-800 hover:text-green-700 font-medium py-2"
              onClick={onClose}
            >
              {t('donate')}
            </Link>
            <Link 
              href="/emergency-appeals" 
              className="text-gray-800 hover:text-green-700 font-medium py-2"
              onClick={onClose}
            >
              {t('emergency_appeals')}
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-800 hover:text-green-700 font-medium py-2"
              onClick={onClose}
            >
              {t('contact')}
            </Link>
          </nav>
          
          {/* Donate CTA - Always visible at bottom */}
          <div className="mt-auto mb-5">
            <Link 
              href="/donate" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md font-bold transition duration-300 w-full block text-center"
              onClick={onClose}
            >
              {t('donate_now')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
