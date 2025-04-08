import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Main layout component that wraps all pages
 * 
 * @param {LayoutProps} props - Component props
 * @returns {JSX.Element} Rendered layout with header, main content, and footer
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Qatarat Gaza | Support Palestine',
  description = 'Support humanitarian relief efforts in Gaza and Palestine through donations and campaigns.'
}) => {
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Logo placeholder */}
              <div className="text-xl font-bold text-green-600">
                Qatarat Gaza
              </div>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-700 hover:text-green-600">About Us</a>
                </li>
                <li>
                  <a href="/our-work" className="text-gray-700 hover:text-green-600">Our Work</a>
                </li>
                <li>
                  <a href="/appeals" className="text-gray-700 hover:text-green-600">Emergency Appeals</a>
                </li>
              </ul>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/donate" 
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md shadow-sm"
              >
                Donate Now
              </a>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Qatarat Gaza</h3>
              <p className="text-gray-300">
                Supporting humanitarian relief efforts in Palestine.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/donate" className="text-gray-300 hover:text-white">Donate</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <p className="text-gray-300 mb-2">Email: info@qatarat.org</p>
              <div className="flex space-x-4 mt-4">
                {/* Social media icons would go here */}
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Qatarat Gaza. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
