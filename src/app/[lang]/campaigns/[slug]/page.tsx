// Moving from /app/campaigns/[slug]/page.tsx to /app/[lang]/campaigns/[slug]/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import TimelineSection from '@/components/campaigns/TimelineSection';
import ContentBlocks from '@/components/campaigns/ContentBlocks';
import DonateButton from '@/components/common/DonateButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

// GraphQL query to fetch campaign data
const GET_CAMPAIGN = gql`
  query GetCampaign($slug: String!) {
    campaign(slug: $slug) {
      id
      title
      description
      headerImage
      status
      goal
      raised
      contentBlocks {
        id
        type
        title
        content
        media
      }
      timeline {
        id
        date
        title
        description
        media
      }
    }
  }
`;

/**
 * Generate metadata for the campaign page
 */
export async function generateMetadata(
  { params }: { params: { slug: string, lang: string } }
): Promise<Metadata> {
  try {
    const { data } = await getClient().query({
      query: GET_CAMPAIGN,
      variables: { slug: params.slug },
    });

    return {
      title: `${data.campaign.title} | Qatarat Gaza`,
      description: data.campaign.description,
    };
  } catch (error) {
    console.error("Error fetching campaign metadata:", error);
    return {
      title: 'Campaign | Qatarat Gaza',
      description: 'Support our ongoing campaign',
    };
  }
}

/**
 * Campaign detail page component
 * Displays full information about a specific campaign
 */
export default async function CampaignPage({ params }: { params: { slug: string, lang: string } }) {
  try {
    const { data } = await getClient().query({
      query: GET_CAMPAIGN,
      variables: { slug: params.slug },
    });

    if (!data || !data.campaign) {
      throw new Error(`Campaign not found: ${params.slug}`);
    }

    const campaign = data.campaign;

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={campaign.headerImage || '/images/campaigns/default-campaign.jpg'}
            alt={campaign.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
            <p className="text-xl mb-4 max-w-2xl">{campaign.description}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <span className="font-bold">${campaign.raised.toLocaleString()}</span>
                <span className="text-sm"> raised of ${campaign.goal.toLocaleString()}</span>
              </div>
              <DonateButton campaignId={campaign.id} campaignName={campaign.title} />
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <ContentBlocks blocks={campaign.contentBlocks} />

        {/* Timeline Section */}
        <TimelineSection timeline={campaign.timeline} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return <ErrorDisplay error={`Failed to load campaign details: ${params.slug}`} />;
  }
}
