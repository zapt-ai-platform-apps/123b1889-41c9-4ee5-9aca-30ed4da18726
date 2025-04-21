import React, { useState } from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';
import ComparisonTable from './ComparisonTable';
import ShoeSelector from './ShoeSelector';
import ColumnSelector from './ColumnSelector';
import MatchScoreExplanation from './MatchScoreExplanation';
import SharingOptions from './SharingOptions';
import { comparisonColumns } from '../data/mockData';

const ShoeComparison = () => {
  const { selectedShoes } = useShoeSelection();
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [showMatchExplanation, setShowMatchExplanation] = useState(false);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const saveComparison = () => {
    // In a real app, this would save to a database
    const comparisonData = {
      shoes: selectedShoes.map(shoe => shoe.id),
      timestamp: new Date().toISOString(),
      userId: 'user123' // Would come from authentication in a real app
    };
    
    console.log('Saving comparison:', comparisonData);
    alert('Comparison saved! (This would be stored in a database in a production app)');
  };

  const generateShareLink = () => {
    // In a real app, this would generate a shareable link with the selected shoes
    const shoeIds = selectedShoes.map(shoe => shoe.id).join(',');
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/compare?shoes=${shoeIds}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Share link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Select Shoes to Compare</h2>
        <p className="text-gray-600 mb-4">
          Choose up to 4 shoes to compare side by side. Your selected shoes will appear in the comparison table below.
        </p>
        <ShoeSelector />
      </section>

      {selectedShoes.length > 0 ? (
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold">Comparison Table</h2>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
              <ColumnSelector columns={comparisonColumns} />
              <button 
                onClick={saveComparison}
                className="btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
              >
                Save Comparison
              </button>
              <button 
                onClick={generateShareLink}
                className="btn-secondary bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded cursor-pointer"
              >
                Share
              </button>
            </div>
          </div>
          
          <ComparisonTable 
            sortConfig={sortConfig} 
            onSort={handleSort}
          />

          <div className="mt-6">
            <button 
              onClick={() => setShowMatchExplanation(!showMatchExplanation)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              {showMatchExplanation ? 'Hide' : 'Show'} match score explanation
            </button>
            
            {showMatchExplanation && <MatchScoreExplanation />}
          </div>

          <SharingOptions />
        </section>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-700">
            Please select at least one shoe to start comparing.
          </p>
        </div>
      )}
      
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">How to Use This Comparison Tool</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">1. Select Shoes</h3>
            <p className="text-gray-600">Use the selector above to add shoes to your comparison (up to 4 at a time).</p>
          </div>
          <div>
            <h3 className="font-semibold">2. Customize Your View</h3>
            <p className="text-gray-600">Show/hide columns that matter to you, and sort by any criteria.</p>
          </div>
          <div>
            <h3 className="font-semibold">3. Review Match Scores</h3>
            <p className="text-gray-600">Match scores show how well each shoe fits your running profile and preferences.</p>
          </div>
          <div>
            <h3 className="font-semibold">4. Save & Share</h3>
            <p className="text-gray-600">Save your comparison for later or share with friends via a link.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoeComparison;