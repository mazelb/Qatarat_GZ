/**
 * Frequency options for donations
 */
export enum DonationFrequency {
  ONE_TIME = 'one-time',
  MONTHLY = 'monthly',
  ANNUAL = 'annual'
}

/**
 * Campaign type for donation targets
 */
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

/**
 * Form data for donation submission
 */
export interface DonationFormData {
  amount: number;
  customAmount?: number;
  frequency: DonationFrequency;
  campaignId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAnonymous?: boolean;
}

/**
 * Emergency appeal status options
 */
export enum AppealStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  URGENT = 'urgent'
}

/**
 * Emergency appeal type
 */
export interface EmergencyAppeal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: AppealStatus;
  targetAmount?: number;
  raisedAmount?: number;
  slug: string;
}
