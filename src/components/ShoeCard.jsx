import React from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';
import { comparisonColumns } from '../data/mockData';
import RatingDisplay from './RatingDisplay';

const ShoeCard = ({ shoe, visibleColumns }) => {
  const { removeShoe } = useShoeSelection();

  // Helper function to get nested properties from an object
  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{shoe.name}</h3>
            <p className="text-sm text-gray-600">{shoe.brand}</p>
          </div>
          <button 
            onClick={() => removeShoe(shoe.id)}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <img 
            src={shoe.image} 
            alt={shoe.name}
            className="w-24 h-24 object-contain" 
          />
          <div className="ml-4 text-center">
            <div className="text-sm text-gray-600">Match Score</div>
            <div className="mt-1 inline-flex items-center justify-center px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
              {shoe.matchScore}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {comparisonColumns.map(column => (
            visibleColumns[column.id] && (
              <div key={column.id} className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-sm text-gray-600">{column.label}</span>
                <span className="font-medium">
                  {column.type === 'rating' ? (
                    <RatingDisplay value={getNestedValue(shoe, column.key)} />
                  ) : (
                    getNestedValue(shoe, column.key)
                  )}
                </span>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium">Most mentioned:</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {shoe.reviews.mostMentionedPros.map(tag => (
              <span key={tag} className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                {tag}
              </span>
            ))}
            {shoe.reviews.mostMentionedCons.map(tag => (
              <span key={tag} className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoeCard;