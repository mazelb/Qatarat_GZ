import React from 'react';

/**
 * LoadingSpinner component
 * Displays a loading spinner animation for async operations
 * 
 * @returns {JSX.Element} Rendered loading spinner
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
