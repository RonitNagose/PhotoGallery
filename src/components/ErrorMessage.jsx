import React from 'react';

/**
 * ErrorMessage component renders an alert message when the API request fails
 * or an unexpected network error occurs.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm"
    >
      {/* Inline SVG Warning/Error Icon */}
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-red-100 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-red-800 mb-1">
        Unable to Load Photos
      </h3>
      <p className="text-sm text-red-600 mb-4">
        {message || 'Something went wrong while fetching photos from the server.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

