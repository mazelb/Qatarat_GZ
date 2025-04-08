import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';
import Layout from '../../components/layout/Layout';
import EmergencyAppealsGrid from '../../components/appeals/EmergencyAppealsGrid';
import { AppealStatus } from '../../types/donation';

/**
 * Emergency Appeals page displaying all ongoing and completed appeals
 * 
 * @returns {JSX.Element} Rendered appeals page
 */
const EmergencyAppealsPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState<AppealStatus | 'all'>('all');

  // Filter options
  const filterOptions = [
    { value: 'all', label: t('appeals.filters.all') },
    { value: AppealStatus.URGENT, label: t('appeals.filters.urgent') },
    { value: AppealStatus.ACTIVE, label: t('appeals.filters.active') },
    { value: AppealStatus.CLOSED, label: t('appeals.filters.closed') },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('appeals.pageTitle')}</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            {t('appeals.pageDescription')}
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              className={`px-4 py-2 rounded-full border ${
                activeFilter === option.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveFilter(option.value as AppealStatus | 'all')}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <EmergencyAppealsGrid 
          filterStatus={activeFilter !== 'all' ? activeFilter as AppealStatus : undefined}
        />
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
}

export default EmergencyAppealsPage;
