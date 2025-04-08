import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Campaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  headerImage: string;
  status: 'Active' | 'Closed' | 'Urgent';
  goal: number;
  raised: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

/**
 * CampaignCard component
 * Displays a card for an individual campaign with image, title, description and progress
 * 
 * @param {CampaignCardProps} props - Component props
 * @returns {JSX.Element} Rendered campaign card
 */
const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { lang } = useParams() as { lang: string };
  const progress = (campaign.raised / campaign.goal) * 100;
  
  // Status badge color
  const statusColor = {
    Active: 'bg-green-100 text-green-800',
    Closed: 'bg-gray-100 text-gray-800',
    Urgent: 'bg-red-100 text-red-800',
  }[campaign.status];

  return (
    <Link href={`/${lang}/campaigns/${campaign.slug}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
        <div className="relative h-48 w-full">
          <Image
            src={campaign.headerImage || '/images/campaigns/default-campaign.jpg'}
            alt={campaign.title}
            fill
            className="object-cover"
          />
          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {campaign.status}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{campaign.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-red-600 h-2 rounded-full" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>${campaign.raised.toLocaleString()} raised</span>
            <span>${campaign.goal.toLocaleString()} goal</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
