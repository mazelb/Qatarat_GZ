import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { onError } from '@apollo/client/link/error';
import { mockCampaigns, mockAboutContent } from './mockData';

/**
 * Create and configure Apollo Client for GraphQL data fetching
 * Includes fallback to mock data when GraphQL API is unavailable
 */
export const { getClient } = registerApolloClient(() => {
  // Create error handling link that falls back to mock data in development
  const errorLink = onError(({ operation, forward }) => {
    // Only use mock data in development
    if (process.env.NODE_ENV === 'development') {
      const operationName = operation.operationName;
      
      // Return mock data based on operation name
      if (operationName === 'GetCampaigns') {
        return forward(operation).map(() => ({ 
          data: { campaigns: mockCampaigns } 
        }));
      }
      
      if (operationName === 'GetCampaign') {
        const variables = operation.variables;
        const campaign = mockCampaigns.find(c => c.slug === variables.slug);
        return forward(operation).map(() => ({ 
          data: { campaign } 
        }));
      }
      
      if (operationName === 'GetAboutContent') {
        return forward(operation).map(() => ({ 
          data: { aboutContent: mockAboutContent } 
        }));
      }
    }
  });

  // Create HTTP link to GraphQL endpoint
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all', // Continue with partial results if possible
      },
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
});
