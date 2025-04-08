import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { DonationFrequency, Campaign, DonationFormData } from '../../types/donation';

// GraphQL query to fetch active campaigns
const GET_ACTIVE_CAMPAIGNS = gql`
  query GetActiveCampaigns {
    campaigns(filter: { isActive: true }) {
      id
      name
      description
    }
  }
`;

/**
 * Predefined donation amounts
 */
const DONATION_AMOUNTS = [10, 25, 50, 100, 250];

/**
 * Props for DonationWidget component
 * 
 * @interface DonationWidgetProps
 * @property {boolean} [embedded] - Whether the widget is embedded in another component
 * @property {string} [defaultCampaignId] - Campaign ID to select by default
 * @property {Function} [onSubmit] - Callback for form submission
 */
interface DonationWidgetProps {
  embedded?: boolean;
  defaultCampaignId?: string;
  onSubmit?: (data: DonationFormData) => void;
}

/**
 * DonationWidget provides a form to collect donation information
 * 
 * @param {DonationWidgetProps} props - Component props
 * @returns {JSX.Element} Rendered donation widget
 */
const DonationWidget: React.FC<DonationWidgetProps> = ({ 
  embedded = false, 
  defaultCampaignId,
  onSubmit 
}) => {
  const { t } = useTranslation('common');
  const { data, loading, error } = useQuery(GET_ACTIVE_CAMPAIGNS);
  
  // Form state
  const [formData, setFormData] = useState<DonationFormData>({
    amount: DONATION_AMOUNTS[1], // Default to second amount (25)
    frequency: DonationFrequency.ONE_TIME,
    campaignId: defaultCampaignId || '',
    customAmount: undefined,
  });
  
  // Set default campaign ID when data loads
  useEffect(() => {
    if (data?.campaigns?.length && !formData.campaignId) {
      setFormData(prev => ({
        ...prev,
        campaignId: data.campaigns[0].id
      }));
    }
  }, [data, formData.campaignId]);

  const [useCustomAmount, setUseCustomAmount] = useState(false);

  /**
   * Handle changing the donation amount
   */
  const handleAmountChange = (amount: number) => {
    setUseCustomAmount(false);
    setFormData({
      ...formData,
      amount,
      customAmount: undefined
    });
  };

  /**
   * Handle custom amount input
   */
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUseCustomAmount(true);
    setFormData({
      ...formData,
      customAmount: isNaN(value) ? 0 : value
    });
  };

  /**
   * Handle frequency selection
   */
  const handleFrequencyChange = (frequency: DonationFrequency) => {
    setFormData({
      ...formData,
      frequency
    });
  };

  /**
   * Handle campaign selection
   */
  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      campaignId: e.target.value
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the final amount (either predefined or custom)
    const finalAmount = useCustomAmount && formData.customAmount 
      ? formData.customAmount 
      : formData.amount;
      
    const submissionData = {
      ...formData,
      amount: finalAmount
    };
    
    if (onSubmit) {
      onSubmit(submissionData);
    } else {
      // Default submission logic if onSubmit not provided
      console.log('Donation data:', submissionData);
      // Here you would implement redirect to checkout or other handling
    }
  };

  // Color styles based on Palestinian flag colors
  const buttonBaseClasses = "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors";
  const primaryButtonClasses = `${buttonBaseClasses} bg-green-600 hover:bg-green-700 text-white`;
  const secondaryButtonClasses = `${buttonBaseClasses} bg-red-600 hover:bg-red-700 text-white`;
  const inactiveButtonClasses = `${buttonBaseClasses} bg-gray-200 text-gray-700`;

  if (loading) {
    return <div className="p-4 text-center">Loading donation options...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Unable to load donation options. Please try again later.</div>;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${embedded ? '' : 'max-w-md mx-auto'}`}>
      <div className="bg-green-600 text-white p-4">
        <h2 className="text-xl font-bold text-center">{t('donate.title')}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            {t('donate.selectAmount')}
          </label>
          
          <div className="grid grid-cols-3 gap-2 mb-2">
            {DONATION_AMOUNTS.map(amount => (
              <button
                key={amount}
                type="button"
                className={`${useCustomAmount || formData.amount !== amount 
                  ? inactiveButtonClasses 
                  : secondaryButtonClasses}`}
                onClick={() => handleAmountChange(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <label className="block text-gray-700 mb-1 text-sm">
              {t('donate.customAmount')}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={useCustomAmount ? formData.customAmount || '' : ''}
                onChange={handleCustomAmountChange}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            {t('donate.frequency')}
          </label>
          
          <div className="grid grid-cols-3 gap-2">
            {Object.values(DonationFrequency).map(frequency => (
              <button
                key={frequency}
                type="button"
                className={`${formData.frequency === frequency 
                  ? secondaryButtonClasses 
                  : inactiveButtonClasses}`}
                onClick={() => handleFrequencyChange(frequency)}
              >
                {t(`donate.frequency.${frequency}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="campaign" className="block text-gray-700 mb-2 font-medium">
            {t('donate.campaign')}
          </label>
          
          <select
            id="campaign"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.campaignId}
            onChange={handleCampaignChange}
            required
          >
            <option value="">{t('donate.selectCampaign')}</option>
            {data?.campaigns?.map((campaign: Campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className={`${primaryButtonClasses} w-full py-3 text-lg font-medium`}
        >
          {t('donate.submitButton')}
        </button>
      </form>
    </div>
  );
};

export default DonationWidget;
