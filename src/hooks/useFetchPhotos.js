import { useState, useEffect } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch photos from the Picsum API on component mount.
 *
 * Responsibilities:
 * 1. Fetches exactly 30 photos from the Picsum API.
 * 2. Maintains photos, loading, and error states.
 * 3. Handles network failures and unsuccessful HTTP status codes.
 * 4. Utilizes AbortController for clean cancellation when unmounting.
 * 5. Returns { photos, loading, error }.
 *
 * @returns {{ photos: Array, loading: boolean, error: string | null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController allows us to cancel the fetch request if the component unmounts
    const abortController = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(PICSUM_API_URL, {
          signal: abortController.signal,
        });

        // Handle unsuccessful HTTP responses (e.g. 404, 500)
        if (!response.ok) {
          throw new Error(`Failed to fetch photos. Server responded with status ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // If the fetch was aborted intentionally, do not set an error state
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'An error occurred while fetching photos.');
      } finally {
        // Only update loading state if the request was not aborted
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    // Cleanup function: aborts any ongoing fetch when the component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Returns exactly the three required values
  return { photos, loading, error };
}

export default useFetchPhotos;

