import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Layout from '../components/layout/Layout';
import DonationWidget from '../components/donation/DonationWidget';
import { DonationFormData } from '../types/donation';

// GraphQL query to fetch campaign details
const GET_CAMPAIGN = gql`
  query GetCampaign($id: ID!) {
    campaign(id: $id) {
      id
      name
      description
      imageUrl
    }
  }
`;

/**
 * Donation page with pre-filled campaign (if provided in query)
 * 
 * @returns {JSX.Element} Rendered donation page
 */
const DonatePage: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { campaign: campaignId } = router.query;
  
  const { data: campaignData } = useQuery(GET_CAMPAIGN, {
    variables: { id: campaignId },
    skip: !campaignId || typeof campaignId !== 'string',
  });

  /**
   * Handle donation form submission
   */
  const handleDonationSubmit = (data: DonationFormData) => {
    // Here you would typically handle the donation process
    // For example, redirect to a Stripe checkout session
    console.log('Processing donation:', data);
    
    // Mock implementation - would be replaced with actual Stripe/payment integration
    router.push({
      pathname: '/donation/processing',
      query: { 
        amount: data.amount,
        frequency: data.frequency,
        campaign: data.campaignId
      }
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {campaignData?.campaign 
            ? t('donate.campaignTitle', { campaign: campaignData.campaign.name }) 
            : t('donate.pageTitle')}
        </h1>
        
        {campaignData?.campaign && (
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600">{campaignData.campaign.description}</p>
          </div>
        )}
        
        <div className="max-w-md mx-auto">
          <DonationWidget 
            defaultCampaignId={typeof campaignId === 'string' ? campaignId : undefined}
            onSubmit={handleDonationSubmit}
          />
        </div>
        
        <div className="mt-12 text-center text-gray-600">
          <h3 className="text-xl font-medium mb-4">{t('donate.otherWays')}</h3>
          <p className="mb-2">{t('donate.contactInfo')}</p>
          <p>{t('donate.thankYou')}</p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}

export default DonatePage;
