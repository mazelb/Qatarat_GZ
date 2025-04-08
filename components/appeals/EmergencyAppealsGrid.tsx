import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { EmergencyAppeal, AppealStatus } from '../../types/donation';

// GraphQL query to fetch emergency appeals
const GET_EMERGENCY_APPEALS = gql`
  query GetEmergencyAppeals {
    emergencyAppeals {
      id
      title
      description
      imageUrl
      status
      targetAmount
      raisedAmount
      slug
    }
  }
`;

/**
 * Props for EmergencyAppealsGrid component
 * 
 * @interface EmergencyAppealsGridProps
 * @property {number} [limit] - Maximum number of appeals to display
 * @property {AppealStatus} [filterStatus] - Optional status to filter appeals by
 */
interface EmergencyAppealsGridProps {
  limit?: number;
  filterStatus?: AppealStatus;
}

/**
 * EmergencyAppealsGrid displays a grid of emergency appeal cards
 * 
 * @param {EmergencyAppealsGridProps} props - Component props
 * @returns {JSX.Element} Rendered emergency appeals grid
 */
const EmergencyAppealsGrid: React.FC<EmergencyAppealsGridProps> = ({ 
  limit,
  filterStatus
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_EMERGENCY_APPEALS);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit || 3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg shadow-md h-96 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="mt-4 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Failed to load emergency appeals.</div>;
  }

  // Filter and limit appeals
  let appeals = [...(data?.emergencyAppeals || [])];
  
  if (filterStatus) {
    appeals = appeals.filter(appeal => appeal.status === filterStatus);
  }
  
  if (limit && appeals.length > limit) {
    appeals = appeals.slice(0, limit);
  }

  // Status tag styling
  const getStatusClasses = (status: AppealStatus) => {
    switch (status) {
      case AppealStatus.URGENT:
        return 'bg-red-600 text-white';
      case AppealStatus.ACTIVE:
        return 'bg-green-600 text-white';
      case AppealStatus.CLOSED:
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Calculate progress percentage
  const calculateProgress = (raised?: number, target?: number) => {
    if (!raised || !target || target === 0) return 0;
    const percentage = (raised / target) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {appeals.map((appeal: EmergencyAppeal) => (
        <div key={appeal.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="relative h-48">
            <Image 
              src={appeal.imageUrl} 
              alt={appeal.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusClasses(appeal.status)}`}>
              {t(`appeals.status.${appeal.status}`)}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{appeal.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{appeal.description}</p>
            
            {appeal.targetAmount && appeal.raisedAmount && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>${appeal.raisedAmount.toLocaleString()} raised</span>
                  <span>Goal: ${appeal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-600 rounded-full" 
                    style={{ width: `${calculateProgress(appeal.raisedAmount, appeal.targetAmount)}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Link href={`/donate?campaign=${appeal.id}`} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-center hover:bg-green-700 transition-colors">
                {t('appeals.donate')}
              </Link>
              <Link href={`/appeals/${appeal.slug}`} className="flex-1 bg-white border border-green-600 text-green-600 py-2 px-4 rounded-md text-center hover:bg-green-50 transition-colors">
                {t('appeals.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyAppealsGrid;
