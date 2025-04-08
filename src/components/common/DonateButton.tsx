import React from 'react';
import Link from 'next/link';

interface DonateButtonProps {
  campaignId?: string;
  campaignName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  lang?: string;
}

/**
 * DonateButton component
 * Reusable button for donation actions that can be sized and customized
 * Can be linked to specific campaigns when campaignId is provided
 * 
 * @param {DonateButtonProps} props - Component props
 * @returns {JSX.Element} Rendered donate button
 */
const DonateButton: React.FC<DonateButtonProps> = ({ 
  campaignId, 
  campaignName,
  className = '',
  size = 'md',
  lang = 'en'
}) => {
  // Determine URL - if campaignId is provided, link to that campaign's donation form
  const donateUrl = campaignId 
    ? `/${lang}/donate?campaign=${campaignId}` 
    : `/${lang}/donate`;

  // Determine size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  }[size];

  return (
    <Link href={donateUrl}>
      <button 
        className={`bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg 
          transition-colors shadow-md ${sizeClasses} ${className}`}
        aria-label={campaignName ? `Donate to ${campaignName}` : "Donate now"}
      >
        Donate{campaignName ? ` to ${campaignName}` : ' Now'}
      </button>
    </Link>
  );
};

export default DonateButton;
