import React from 'react';

const RatingDisplay = ({ value }) => {
  // Convert value (assuming 0-10 scale) to a color scale
  const getColorClass = (rating) => {
    if (rating >= 9) return 'bg-green-500';
    if (rating >= 8) return 'bg-green-400';
    if (rating >= 7) return 'bg-green-300';
    if (rating >= 6) return 'bg-yellow-300';
    if (rating >= 5) return 'bg-yellow-400';
    if (rating >= 4) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`h-4 w-4 rounded-full mr-1 ${getColorClass(value)}`}></div>
      <span>{value?.toFixed(1) || 'N/A'}</span>
    </div>
  );
};

export default RatingDisplay;