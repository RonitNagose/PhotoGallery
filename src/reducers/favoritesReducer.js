/**
 * Storage key used for persisting favorites in the browser's localStorage.
 */
export const FAVORITES_STORAGE_KEY = 'photo-gallery-favorites';

/**
 * Action types for the favorites reducer.
 */
export const FAVORITE_ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_FAVORITES: 'SET_FAVORITES',
};

/**
 * Safely reads saved favorites from localStorage.
 * Handles missing data or JSON parsing errors without breaking the application.
 *
 * @returns {Array} Array of favorite photo objects, or empty array if none/invalid.
 */
export const getStoredFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

/**
 * Safely saves the favorites list to localStorage.
 *
 * @param {Array} favorites - The updated favorites array.
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

/**
 * Reducer function to manage favorite photos state.
 *
 * Actions handled:
 * - ADD_FAVORITE: Adds a photo to the favorites list while preventing duplicates.
 * - REMOVE_FAVORITE: Removes a photo from the favorites list by ID.
 * - SET_FAVORITES: Replaces current state with an array (e.g. on initial load from localStorage).
 *
 * @param {Array} state - Current array of favorite photos.
 * @param {Object} action - Action object containing `type` and `payload`.
 * @returns {Array} Updated favorites array.
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITE_ACTIONS.ADD_FAVORITE: {
      const photoToAdd = action.payload;
      if (!photoToAdd || photoToAdd.id === undefined) {
        return state;
      }
      // Avoid duplicate favorites
      const alreadyExists = state.some(
        (fav) => String(fav.id) === String(photoToAdd.id)
      );
      if (alreadyExists) {
        return state;
      }
      return [...state, photoToAdd];
    }

    case FAVORITE_ACTIONS.REMOVE_FAVORITE: {
      const target = action.payload;
      const targetId = target?.id !== undefined ? target.id : target;
      return state.filter((fav) => String(fav.id) !== String(targetId));
    }

    case FAVORITE_ACTIONS.SET_FAVORITES: {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    default:
      return state;
  }
}

