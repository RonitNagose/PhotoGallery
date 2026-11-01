import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favoritesReducer,
  getStoredFavorites,
  saveFavorites,
  FAVORITE_ACTIONS,
} from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery component is the primary container for the photo gallery.
 *
 * Responsibilities:
 * 1. Fetches photos using the custom `useFetchPhotos` hook.
 * 2. Manages favorites state using `useReducer` and persistent localStorage sync.
 * 3. Handles search input with memoized callback via `useCallback`.
 * 4. Filters photos efficiently by author name via `useMemo`.
 * 5. Coordinates display states: loading skeletons, errors, empty results, and responsive grid.
 */
export default function Gallery() {
  // Requirement 2 & 6: Fetch photos using the custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Requirement 5: Manage favorites using useReducer (DO NOT use useState)
  // Initialized safely from localStorage via lazy initializer
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    [],
    getStoredFavorites
  );

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Persist updated favorites to localStorage whenever favorites state changes
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  /**
   * Requirement 7 (useCallback):
   * Memoizes the search handler function between renders.
   * Prevents creating a new function instance on every render cycle.
   */
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  /**
   * Requirement 7 (useMemo):
   * Memoizes the filtered photo list.
   * Performs real-time, case-insensitive filtering by author name.
   * Only recalculates when `photos` or `searchQuery` changes, avoiding
   * expensive array filtering on unrelated state updates (e.g. toggling favorites).
   */
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  /**
   * Toggles favorite status of a photo using the reducer dispatch.
   */
  const handleToggleFavorite = (photo) => {
    const isFav = favorites.some((fav) => String(fav.id) === String(photo.id));
    if (isFav) {
      dispatch({
        type: FAVORITE_ACTIONS.REMOVE_FAVORITE,
        payload: photo,
      });
    } else {
      dispatch({
        type: FAVORITE_ACTIONS.ADD_FAVORITE,
        payload: photo,
      });
    }
  };

  // Set of favorite IDs for O(1) fast lookup when rendering cards
  const favoriteIdSet = useMemo(() => {
    return new Set(favorites.map((fav) => String(fav.id)));
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* HEADER SECTION */}
      <header className="text-center mb-8">
        {/* Subtle decorative accent pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
          <span>Curated Collection</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          Photo Gallery
        </h1>

        <p className="text-base md:text-lg text-slate-500 max-w-lg mx-auto mb-6">
          Discover beautiful photographs
        </p>

        {/* Stats Badges: Total Photos & Live Favorites Count */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-sm text-xs md:text-sm font-medium text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{photos.length > 0 ? `${photos.length} Photos` : '30 Photos'}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-sm text-xs md:text-sm font-medium text-slate-700 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-4 h-4 text-rose-500 transition-transform ${
                favorites.length > 0 ? 'scale-110' : ''
              }`}
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.28 2.25 8.5 2.25 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 21.75 5.42 21.75 8.5c0 3.78-2.438 6.86-4.741 8.99a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span>
              {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
            </span>
          </div>
        </div>
      </header>

      {/* SEARCH SECTION */}
      <section aria-label="Search filter">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          matchCount={filteredPhotos.length}
          totalCount={photos.length}
        />
      </section>

      {/* GALLERY CONTENT & STATE HANDLING */}
      <main aria-label="Photo collection">
        {/* Loading State with Modern Skeleton Preview */}
        {loading && <Loader />}

        {/* Error State */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* Empty Search Results State */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm max-w-md mx-auto my-6">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1.5">
              No photos found
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              No photos match author &ldquo;{searchQuery}&rdquo;. Try another name or clear your search.
            </p>
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors active:scale-95"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Requirement 3: Responsive Photo Grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favoriteIdSet.has(String(photo.id))}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
