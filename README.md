# Photo Gallery Web Application – Celebrare Frontend Internship Assignment

A modern, responsive, and highly interactive Photo Gallery web application built using React, Vite, and Tailwind CSS. The application fetches photos from the Picsum API, supports real-time author filtering, and manages user favorites with persistent storage via `useReducer` and `localStorage`.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local server URL (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## ✨ Interactive & Cool UI Features

1. **Skeleton Shimmer Loading:**
   - Shimmer skeleton grid during the initial API fetch and for individual image loading. Eliminates blank flashes and provides smooth visual feedback.
2. **Heart-Pop Micro-Interaction:**
   - Delightful spring bounce keyframe animation (`animate-heart-pop`) when favoriting a photo.
   - Glassmorphic top-right "Saved" badge on favorited photos.
3. **Smart Search Bar:**
   - Keyboard shortcut: Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to instantly focus the search input.
   - Live counter chip showing matching photos (e.g., "Showing 8 of 30 photos").
   - One-click clear button with smooth focus retention.
4. **Author Avatar Initials:**
   - Dynamic gradient avatar initials for each photographer alongside their full name.
5. **Interactive Header Stats:**
   - Curated collection badge, photo count, and live favorites counter with responsive layout.
6. **Polished Empty State:**
   - Friendly search-not-found illustration with an interactive "Clear search" button.

---

## 📁 Project Structure

```
MyGallery/
├── index.html                  # HTML entry point with metadata and root element
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration for Tailwind CSS
├── tailwind.config.js          # Tailwind CSS configuration with content paths
├── vite.config.js              # Vite bundler configuration with React plugin
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx    # Displays friendly error alerts if API request fails
│   │   ├── Gallery.jsx         # Primary gallery view orchestrating state, search & grid
│   │   ├── Loader.jsx          # Inline animated SVG spinner + skeleton grid preview
│   │   ├── PhotoCard.jsx       # Photo card with shimmer loader, author avatar & heart button
│   │   └── SearchBar.jsx       # Interactive search input with ⌘K shortcut and match count
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom React hook fetching 30 photos with AbortController
│   ├── reducers/
│   │   └── favoritesReducer.js # Pure reducer managing favorites (ADD, REMOVE, SET) & localStorage
│   ├── App.jsx                 # Root application wrapper
│   ├── index.css               # Global stylesheet with Tailwind directives & keyframe animations
│   └── main.jsx                # React DOM entry point with React.StrictMode
```

---

## 🎯 Implementation of Assignment Requirements

| Requirement | Implementation Details | File Location |
| :--- | :--- | :--- |
| **1. Project Setup** | React 18 + Vite, Tailwind CSS, clean modular architecture. No external UI component libraries used. | `package.json`, `tailwind.config.js`, `src/` |
| **2. Fetch Photos from API** | Fetches 30 photos on mount from `https://picsum.photos/v2/list?limit=30` using native `fetch` + `async/await`. Handles HTTP errors (`!response.ok`). | `src/hooks/useFetchPhotos.js` |
| **3. Responsive Gallery** | 4 columns on desktop (`lg:grid-cols-4`), 2 columns on tablet (`md:grid-cols-2`), and 1 column on mobile (`grid-cols-1`). Cards feature rounded corners, subtle shadows, hover effects, and `object-cover`. | `src/components/Gallery.jsx`, `src/components/PhotoCard.jsx` |
| **4. Search Filter** | Real-time, case-insensitive author search filtering already-fetched photos without re-fetching or page reloads. Shows friendly "No photos found" when no authors match. | `src/components/SearchBar.jsx`, `src/components/Gallery.jsx` |
| **5. Favorites via `useReducer`** | `useReducer` handles all favorite state updates via `ADD_FAVORITE`, `REMOVE_FAVORITE`, and `SET_FAVORITES`. Avoids duplicate entries. Persists state to `localStorage` (`photo-gallery-favorites`). | `src/reducers/favoritesReducer.js`, `src/components/Gallery.jsx` |
| **6. Custom Hook `useFetchPhotos`** | Encapsulates API fetching logic, returning `{ photos, loading, error }`. Implements `AbortController` cleanup to cancel unmounted fetch calls. | `src/hooks/useFetchPhotos.js` |
| **7. `useCallback` & `useMemo`** | `useCallback` memoizes the search handler function. `useMemo` memoizes the filtered photo list so filtering by author only runs when photos or search query change. | `src/components/Gallery.jsx` |

---

## 🎙️ 5-Minute Screening Video Walkthrough Guide

Use these talking points to explain your code confidently during your interview:

### 1. Custom Hook & Separation of Concerns (`useFetchPhotos.js`)
- Keeps data fetching, error handling, and loading state out of the UI components.
- Uses `AbortController` for clean cancellation when unmounting, preventing memory leaks and state updates on unmounted components.

### 2. State Management with `useReducer` & `localStorage` (`favoritesReducer.js`)
- `useReducer` centralizes state transitions (`ADD_FAVORITE`, `REMOVE_FAVORITE`, `SET_FAVORITES`) into a predictable pure function.
- Avoids duplicate favorites and restores saved state lazily upon initialization.

### 3. Performance Optimization with `useCallback` & `useMemo`
- **`useCallback` on `handleSearchChange`:** Preserves function identity across renders.
- **`useMemo` on `filteredPhotos`:** Prevents unnecessary filtering runs when toggling favorites.
- **$O(1)$ Favorite Lookup:** `favoriteIdSet` memoizes a `Set` of favorite IDs for rapid card checks.

### 4. Interactive UX & Micro-interactions
- Keyboard shortcut `⌘K`/`Ctrl+K` for search.
- Smooth shimmer skeleton placeholders for initial load and image rendering.
- Bouncy heart micro-interaction when saving favorites.
