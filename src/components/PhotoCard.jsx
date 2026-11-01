import React, { useState } from 'react';

/**
 * Generates a consistent pastel gradient avatar based on the author's initials.
 */
function getAuthorInitial(name = '') {
  const clean = name.trim();
  return clean ? clean.charAt(0).toUpperCase() : '?';
}

/**
 * PhotoCard component renders an interactive photo card with:
 * - Shimmer skeleton while image loads + smooth fade-in transition.
 * - Author initials avatar & photographer title.
 * - Heart-shaped favorite button with delightful bounce micro-interaction.
 * - Consistent aspect ratio and object-cover image sizing.
 *
 * @param {Object} props
 * @param {Object} props.photo - Photo data object (id, author, download_url, etc.)
 * @param {boolean} props.isFavorite - Favorite status
 * @param {Function} props.onToggleFavorite - Handler to toggle favorite
 */
export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animatingHeart, setAnimatingHeart] = useState(false);

  const initial = getAuthorInitial(photo.author);

  const handleFavoriteClick = () => {
    // Trigger bounce micro-interaction if turning favorite on
    if (!isFavorite) {
      setAnimatingHeart(true);
      setTimeout(() => setAnimatingHeart(false), 400);
    }
    onToggleFavorite(photo);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Photo Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* Shimmer Placeholder while high-res image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer z-0" aria-hidden="true" />
        )}

        {/* High-Resolution Photo */}
        <img
          src={photo.download_url}
          alt={`Photo taken by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Favorite Pill (visible when photo is favorited) */}
        {isFavorite && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-xs font-semibold text-rose-600 animate-fadeIn pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-rose-500"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.28 2.25 8.5 2.25 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 21.75 5.42 21.75 8.5c0 3.78-2.438 6.86-4.741 8.99a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span>Saved</span>
          </div>
        )}
      </div>

      {/* Card Footer: Author Name & Favorite Heart Button */}
      <div className="p-4 flex items-center justify-between gap-3 bg-white z-10">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Author Initials Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm select-none"
            aria-hidden="true"
          >
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-none mb-1">
              Photographer
            </p>
            <h3
              className="text-sm font-semibold text-slate-800 truncate leading-tight group-hover:text-indigo-600 transition-colors"
              title={photo.author}
            >
              {photo.author}
            </h3>
          </div>
        </div>

        {/* Heart-Shaped Favourite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? `Remove photo by ${photo.author} from favorites`
              : `Add photo by ${photo.author} to favorites`
          }
          className={`p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 shadow-sm'
              : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
          } ${animatingHeart ? 'animate-heart-pop' : 'active:scale-90'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className={`w-5 h-5 transition-transform duration-200 ${
              isFavorite
                ? 'fill-rose-500 text-rose-500 scale-110'
                : 'fill-none'
            }`}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
