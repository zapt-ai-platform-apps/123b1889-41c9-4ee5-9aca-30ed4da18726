import React from 'react';
import ShoeComparison from './components/ShoeComparison';
import { ShoeSelectionProvider } from './context/ShoeSelectionContext';
import ZaptBadge from './components/ZaptBadge';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Running Shoes Comparison</h1>
          <p className="text-blue-100">Compare specs, reviews, and find your perfect match</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <ShoeSelectionProvider>
          <ShoeComparison />
        </ShoeSelectionProvider>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Running Shoes Comparison</p>
            </div>
            <ZaptBadge />
          </div>
        </div>
      </footer>
    </div>
  );
}