import { graphql } from 'msw';
import { AppealStatus, DonationFrequency } from '../types/donation';

// Mock campaigns data
const campaigns = [
  {
    id: '1',
    name: 'Gaza Emergency Relief',
    description: 'Provide essential aid to families affected by the crisis in Gaza.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1610870014896-5e52cc8d3393?ixlib=rb-4.0.3',
    targetAmount: 100000,
    raisedAmount: 65400
  },
  {
    id: '2',
    name: 'West Bank Food Security',
    description: 'Support families in the West Bank with food packages and essential supplies.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1531422888678-d63698df3943?ixlib=rb-4.0.3',
    targetAmount: 50000,
    raisedAmount: 28750
  },
  {
    id: '3',
    name: 'Clean Water Initiative',
    description: 'Help provide clean water infrastructure to communities in need.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3',
    targetAmount: 75000,
    raisedAmount: 42300
  }
];

// Mock emergency appeals data
const emergencyAppeals = [
  {
    id: '1',
    title: 'Gaza Humanitarian Crisis',
    description: 'Urgent support needed for medical supplies, food, and shelter for families affected by ongoing violence in Gaza.',
    imageUrl: 'https://images.unsplash.com/photo-1623411235825-4366e96e4c1b?ixlib=rb-4.0.3',
    status: AppealStatus.URGENT,
    targetAmount: 500000,
    raisedAmount: 325000,
    slug: 'gaza-humanitarian-crisis',
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2023-10-30T14:30:00Z'
  },
  {
    id: '2',
    title: 'Winter Relief Campaign',
    description: 'Help provide warm clothing, blankets, and heating fuel to displaced families during the harsh winter months.',
    imageUrl: 'https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixlib=rb-4.0.3',
    status: AppealStatus.ACTIVE,
    targetAmount: 200000,
    raisedAmount: 98000,
    slug: 'winter-relief-campaign',
    createdAt: '2023-11-05T10:00:00Z',
    updatedAt: '2023-11-20T16:45:00Z'
  },
  {
    id: '3',
    title: 'School Rebuilding Project',
    description: 'Support the reconstruction of schools damaged during conflict to ensure children can continue their education.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3',
    status: AppealStatus.ACTIVE,
    targetAmount: 350000,
    raisedAmount: 215000,
    slug: 'school-rebuilding-project',
    createdAt: '2023-09-20T09:15:00Z',
    updatedAt: '2023-11-15T11:20:00Z'
  },
  {
    id: '4',
    title: 'Medical Aid Delivery',
    description: 'Completed campaign to deliver essential medical supplies to hospitals in Gaza.',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3',
    status: AppealStatus.CLOSED,
    targetAmount: 150000,
    raisedAmount: 162000,
    slug: 'medical-aid-delivery',
    createdAt: '2023-08-10T08:30:00Z',
    updatedAt: '2023-09-05T15:10:00Z'
  }
];

// Export the handlers
export const handlers = [
  // Get all active campaigns
  graphql.query('GetActiveCampaigns', (req, res, ctx) => {
    return res(
      ctx.data({
        campaigns: campaigns.filter(campaign => campaign.isActive)
      })
    );
  }),
  
  // Get a single campaign by ID
  graphql.query('GetCampaign', (req, res, ctx) => {
    const { id } = req.variables;
    const campaign = campaigns.find(c => c.id === id);
    
    if (!campaign) {
      return res(
        ctx.errors([
          {
            message: 'Campaign not found',
            extensions: { code: 'NOT_FOUND' }
          }
        ])
      );
    }
    
    return res(
      ctx.data({
        campaign
      })
    );
  }),
  
  // Get all emergency appeals
  graphql.query('GetEmergencyAppeals', (req, res, ctx) => {
    return res(
      ctx.data({
        emergencyAppeals
      })
    );
  }),
  
  // Create checkout session
  graphql.mutation('CreateCheckoutSession', (req, res, ctx) => {
    const { input } = req.variables;
    
    // Mock checkout creation - in a real app this would integrate with Stripe
    return res(
      ctx.data({
        createCheckoutSession: {
          id: 'cs_test_' + Math.random().toString(36).substr(2, 9),
          url: 'https://checkout.stripe.com/mock-checkout'
        }
      })
    );
  })
];
