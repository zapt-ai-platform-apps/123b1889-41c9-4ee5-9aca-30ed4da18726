import React, { createContext, useState, useContext } from 'react';
import { mockShoes } from '../data/mockData';

const ShoeSelectionContext = createContext();

export const useShoeSelection = () => useContext(ShoeSelectionContext);

export const ShoeSelectionProvider = ({ children }) => {
  const [selectedShoes, setSelectedShoes] = useState(mockShoes.slice(0, 3));
  const [availableShoes, setAvailableShoes] = useState(mockShoes);
  const [visibleColumns, setVisibleColumns] = useState({
    weight: true,
    drop: true,
    cushionType: true,
    runningType: true,
    price: true,
    durability: true,
    comfort: true,
    stability: true,
    responsiveness: true,
    terrain: true,
  });

  // Maximum number of shoes that can be compared at once
  const MAX_COMPARISON_ITEMS = 4;

  const addShoe = (shoeId) => {
    if (selectedShoes.length >= MAX_COMPARISON_ITEMS) {
      return false;
    }
    
    const shoeToAdd = availableShoes.find(shoe => shoe.id === shoeId);
    if (shoeToAdd && !selectedShoes.some(shoe => shoe.id === shoeId)) {
      setSelectedShoes([...selectedShoes, shoeToAdd]);
      return true;
    }
    return false;
  };

  const removeShoe = (shoeId) => {
    setSelectedShoes(selectedShoes.filter(shoe => shoe.id !== shoeId));
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns({
      ...visibleColumns,
      [columnKey]: !visibleColumns[columnKey]
    });
  };

  const getSortedShoes = (sortBy, direction) => {
    return [...selectedShoes].sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      if (typeof valueA === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  const value = {
    selectedShoes,
    availableShoes,
    visibleColumns,
    addShoe,
    removeShoe,
    toggleColumn,
    getSortedShoes,
    MAX_COMPARISON_ITEMS
  };

  return (
    <ShoeSelectionContext.Provider value={value}>
      {children}
    </ShoeSelectionContext.Provider>
  );
};