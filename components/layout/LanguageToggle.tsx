import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

/**
 * LanguageToggle component provides language switching functionality
 * Supports Arabic and English with appropriate RTL/LTR handling
 * 
 * @returns {JSX.Element} - The rendered LanguageToggle component
 */
const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Changes the application language/locale
   * 
   * @param {string} locale - The locale code to switch to ('en', 'ar', or 'fr')
   */
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setIsOpen(false);
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current language for display
  const currentLanguage = 
    router.locale === 'ar' ? 'العربية' : 
    router.locale === 'fr' ? 'Français' : 
    'English';
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center w-full px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        id="language-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {currentLanguage}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            <button
              className={`${
                router.locale === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
              role="menuitem"
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button
              className={`${
                router.locale === 'fr' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
              role="menuitem"
              onClick={() => changeLanguage('fr')}
            >
              Français
            </button>
            <button
              className={`${
                router.locale === 'ar' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block w-full text-right px-4 py-2 text-sm hover:bg-gray-100`}
              role="menuitem"
              onClick={() => changeLanguage('ar')}
            >
              العربية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
