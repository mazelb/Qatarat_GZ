import { setupWorker } from 'msw';
import { handlers } from './graphql-handlers';

// This configures a Service Worker with the given handlers
export const worker = setupWorker(...handlers);

// Make sure we're in a browser environment
if (typeof window !== 'undefined') {
  // Initialize the MSW worker before starting the app when in development
  if (process.env.NODE_ENV === 'development') {
    worker.start({
      onUnhandledRequest: 'bypass', // Doesn't warn about unhandled requests
    });
    console.log('MSW started');
  }
}
