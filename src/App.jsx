import React from 'react';
import Gallery from './components/Gallery';

/**
 * Root Application Component
 * Provides the main layout wrapper and renders the Photo Gallery.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Gallery />
    </div>
  );
}

