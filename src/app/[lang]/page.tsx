import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedCampaigns from '@/components/home/FeaturedCampaigns';

export const metadata: Metadata = {
  title: 'Qatarat Gaza | Supporting Communities in Gaza',
  description: 'Qatarat Gaza is a charity organization providing humanitarian aid and sustainable solutions to communities in Gaza.',
};

/**
 * Home page component
 * Landing page for the website featuring hero section and featured campaigns
 */
export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <main>
      {/* Hero Section with rotating banners */}
      <Hero lang={params.lang} />
      
      {/* Featured Campaigns Section */}
      <FeaturedCampaigns lang={params.lang} />
      
      {/* Additional homepage sections can be added here */}
    </main>
  );
}
