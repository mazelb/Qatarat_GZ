// Moving from /app/campaigns/page.tsx to /app/[lang]/campaigns/page.tsx

import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import CampaignCard from '@/components/campaigns/CampaignCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

export const metadata: Metadata = {
  title: 'Active Campaigns | Qatarat Gaza',
  description: 'Explore our current emergency appeals and ongoing campaigns to help those in need.',
};

// GraphQL query to fetch all campaigns
const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
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
 * Campaigns listing page
 * Displays all available campaigns in a grid layout
 */
export default async function CampaignsPage({ params }: { params: { lang: string } }) {
  try {
    const { data } = await getClient().query({
      query: GET_CAMPAIGNS,
    });

    if (!data || !data.campaigns) {
      throw new Error("Failed to fetch campaigns data");
    }

    // If the API returns empty array, show a message instead
    const hasCampaigns = data.campaigns.length > 0;

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Emergency Appeals & Campaigns</h1>
        
        {hasCampaigns ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.campaigns.map((campaign: any) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No active campaigns at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return <ErrorDisplay error="Failed to load campaigns" />;
  }
}
