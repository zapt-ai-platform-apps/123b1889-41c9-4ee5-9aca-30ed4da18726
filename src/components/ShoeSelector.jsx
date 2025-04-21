import React, { useState } from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';

const ShoeSelector = () => {
  const { availableShoes, selectedShoes, addShoe, removeShoe, MAX_COMPARISON_ITEMS } = useShoeSelection();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShoes = availableShoes.filter(shoe => 
    shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shoe.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddShoe = (shoeId) => {
    if (selectedShoes.length >= MAX_COMPARISON_ITEMS) {
      alert(`You can compare up to ${MAX_COMPARISON_ITEMS} shoes at once. Please remove a shoe first.`);
      return;
    }
    addShoe(shoeId);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search shoes by name or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded box-border focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Selected Shoes ({selectedShoes.length}/{MAX_COMPARISON_ITEMS})</h3>
        {selectedShoes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedShoes.map(shoe => (
              <div key={shoe.id} className="inline-flex items-center bg-blue-50 px-3 py-1 rounded">
                <img src={shoe.image} alt={shoe.name} className="w-6 h-6 mr-2 object-contain" />
                <span className="text-sm">{shoe.name}</span>
                <button 
                  onClick={() => removeShoe(shoe.id)}
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No shoes selected yet</p>
        )}
      </div>

      <h3 className="font-semibold mb-2">Available Shoes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredShoes.map(shoe => {
          const isSelected = selectedShoes.some(s => s.id === shoe.id);
          
          return (
            <div 
              key={shoe.id} 
              className={`border rounded p-3 flex flex-col ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
            >
              <div className="flex items-center mb-2">
                <img src={shoe.image} alt={shoe.name} className="w-12 h-12 object-contain mr-3" />
                <div>
                  <h4 className="font-medium">{shoe.name}</h4>
                  <p className="text-sm text-gray-600">{shoe.brand}</p>
                </div>
              </div>
              
              <div className="text-sm mt-auto">
                <div className="flex justify-between mb-1">
                  <span>Price:</span>
                  <span className="font-medium">${shoe.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-medium">{shoe.reviews.averageRating} ★</span>
                </div>
              </div>
              
              <button
                onClick={() => isSelected ? removeShoe(shoe.id) : handleAddShoe(shoe.id)}
                className={`mt-3 py-1 px-3 rounded text-sm font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSelected ? 'Remove' : 'Add to Compare'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoeSelector;