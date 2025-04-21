import React from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';
import { comparisonColumns } from '../data/mockData';
import ShoeCard from './ShoeCard';
import RatingDisplay from './RatingDisplay';

const ComparisonTable = ({ sortConfig, onSort }) => {
  const { selectedShoes, visibleColumns, getSortedShoes } = useShoeSelection();
  
  // Get sorted shoes based on sort configuration
  const shoes = sortConfig.key 
    ? getSortedShoes(sortConfig.key, sortConfig.direction)
    : selectedShoes;

  // Helper function to get nested properties from an object
  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
  };

  const renderColumnHeader = (column) => {
    return (
      <th 
        key={column.id}
        className={`p-2 cursor-pointer hover:bg-gray-100 ${!visibleColumns[column.id] ? 'hidden' : ''}`}
        onClick={() => onSort(column.key)}
      >
        <div className="flex items-center">
          <span>{column.label}</span>
          {sortConfig.key === column.key && (
            <span className="ml-1">
              {sortConfig.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    );
  };

  const renderCellValue = (shoe, column) => {
    const value = getNestedValue(shoe, column.key);
    
    if (column.type === 'rating') {
      return <RatingDisplay value={value} />;
    }
    
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 gap-4 mb-6 md:hidden">
        {shoes.map(shoe => (
          <ShoeCard key={shoe.id} shoe={shoe} visibleColumns={visibleColumns} />
        ))}
      </div>

      <table className="w-full border-collapse hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Shoe</th>
            <th className="p-2 text-center">Match Score</th>
            {comparisonColumns.map(column => renderColumnHeader(column))}
          </tr>
        </thead>
        <tbody>
          {shoes.map(shoe => (
            <tr key={shoe.id} className="border-t">
              <td className="p-3">
                <div className="flex items-center">
                  <img 
                    src={shoe.image} 
                    alt={shoe.name} 
                    className="w-16 h-16 object-contain mr-3" 
                  />
                  <div>
                    <div className="font-semibold">{shoe.name}</div>
                    <div className="text-sm text-gray-600">{shoe.brand}</div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                  {shoe.matchScore}%
                </div>
              </td>
              {comparisonColumns.map(column => (
                <td 
                  key={`${shoe.id}-${column.id}`}
                  className={`p-3 text-center ${!visibleColumns[column.id] ? 'hidden' : ''}`}
                >
                  {renderCellValue(shoe, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;