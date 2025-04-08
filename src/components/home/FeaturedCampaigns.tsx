import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import CampaignCard from '../../components/campaigns/CampaignCard';

interface FeaturedCampaignsProps {
  lang: string;
}

// GraphQL query to fetch featured campaigns
const GET_FEATURED_CAMPAIGNS = gql`
  query GetFeaturedCampaigns {
    campaigns(featured: true) {
      id
      slug
      title
      description
      headerImage
      status
      goal
      raised
    }
  }
`;

/**
 * FeaturedCampaigns component
 * Displays a section with highlighted campaigns on the homepage
 */
const FeaturedCampaigns = async ({ lang }: FeaturedCampaignsProps) => {
  const { data } = await getClient().query({
    query: GET_FEATURED_CAMPAIGNS,
  });

  const campaigns = data?.campaigns || [];

  return (
    <section id="featured-campaigns" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Campaigns</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Support our most urgent appeals and ongoing projects to help communities in Gaza access essential resources and services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {campaigns.slice(0, 3).map((campaign: any) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href={`/${lang}/campaigns`}
            className="inline-block bg-palestine-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View All Campaigns
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
