import React, { useRef, useEffect } from 'react';

/**
 * SearchBar component provides an interactive search input with:
 * - Inline SVG search icon with active focus transition.
 * - One-click clear button when text is entered.
 * - Keyboard shortcut (⌘K or Ctrl+K) to focus the input instantly.
 *
 * @param {Object} props
 * @param {string} props.value - Current search query.
 * @param {Function} props.onChange - Handler called on search query change.
 * @param {number} [props.matchCount] - Number of matching photos.
 * @param {number} [props.totalCount] - Total fetched photos count.
 */
export default function SearchBar({
  value,
  onChange,
  matchCount,
  totalCount,
}) {
  const inputRef = useRef(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or '/' focuses the search bar
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="relative group">
        {/* Glow effect on hover/focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-200 group-focus-within:border-indigo-500 group-focus-within:ring-4 group-focus-within:ring-indigo-100">
          {/* Inline SVG Search Icon */}
          <div className="pl-4 pr-2 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-200">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search photos by author..."
            aria-label="Search photos by author"
            className="w-full py-3.5 pr-20 bg-transparent text-slate-900 placeholder-slate-400 text-sm md:text-base outline-none"
          />

          {/* Right Action Area: Clear Button and/or Shortcut Badge */}
          <div className="pr-3 flex items-center gap-2">
            {value ? (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  inputRef.current?.focus();
                }}
                aria-label="Clear search input"
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md select-none">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Live Filtering Counter Badge */}
      {value && matchCount !== undefined && totalCount !== undefined && (
        <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{matchCount}</strong> of{' '}
            {totalCount} photos
          </span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
