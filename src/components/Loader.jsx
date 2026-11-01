import React from 'react';

/**
 * Loader component renders a modern animated SVG spinner
 * accompanied by a responsive skeleton grid preview with shimmering placeholders.
 */
export default function Loader({ message = 'Loading high-resolution photos...' }) {
  // Generate 8 skeleton placeholder cards for the grid preview
  const skeletonCards = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full py-6" role="status" aria-live="polite">
      {/* Central Spinner & Status Pill */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="relative flex items-center justify-center mb-3">
          {/* Subtle pulsating outer ring */}
          <div className="absolute w-14 h-14 rounded-full bg-indigo-100 animate-ping opacity-60"></div>

          {/* Inline SVG Rotating Spinner */}
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 relative z-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3.5"
            ></circle>
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <p className="text-slate-700 font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
          <span>{message}</span>
        </p>
        <span className="sr-only">Loading</span>
      </div>

      {/* Shimmer Skeleton Cards matching responsive grid (4 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-70">
        {skeletonCards.map((id) => (
          <div
            key={id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
          >
            {/* Shimmering Image Area */}
            <div className="aspect-[4/3] w-full animate-shimmer"></div>

            {/* Shimmering Card Footer */}
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                {/* Skeleton Author Avatar */}
                <div className="w-8 h-8 rounded-full animate-shimmer flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 animate-shimmer rounded"></div>
                  <div className="h-4 w-28 animate-shimmer rounded"></div>
                </div>
              </div>
              {/* Skeleton Favorite Button */}
              <div className="w-8 h-8 rounded-full animate-shimmer flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
