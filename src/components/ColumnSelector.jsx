import React, { useState } from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';

const ColumnSelector = ({ columns }) => {
  const { visibleColumns, toggleColumn } = useShoeSelection();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded cursor-pointer flex items-center"
      >
        Customize Columns
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
              Toggle columns to display
            </div>
            {columns.map(column => (
              <label 
                key={column.id}
                className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[column.id]}
                  onChange={() => toggleColumn(column.id)}
                  className="mr-2"
                />
                <span className="text-sm">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;