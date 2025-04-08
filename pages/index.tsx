import React from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';
import Layout from '../components/layout/Layout';
import DonationWidget from '../components/donation/DonationWidget';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526817575615-7685a7295e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
            alt="Palestine landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 flex">
          <div className="max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Support Gaza Humanitarian Relief
            </h1>
            <p className="text-xl mb-8">
              Join us in providing vital aid to those affected by the ongoing crisis in Gaza and Palestine.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/donate"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md shadow-lg"
              >
                Donate Now
              </a>
              <a
                href="/appeals"
                className="inline-block bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-md border-2 border-white"
              >
                Emergency Appeals
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}
