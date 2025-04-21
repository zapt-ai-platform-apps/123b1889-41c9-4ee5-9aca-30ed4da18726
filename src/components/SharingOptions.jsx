import React from 'react';
import { useShoeSelection } from '../context/ShoeSelectionContext';

const SharingOptions = () => {
  const { selectedShoes } = useShoeSelection();
  
  const shareToSocialMedia = (platform) => {
    // In a real app, this would integrate with social media platforms
    const shoeNames = selectedShoes.map(shoe => shoe.name).join(', ');
    const shareText = `Check out my comparison of running shoes: ${shoeNames}`;
    
    let shareUrl;
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Running Shoe Comparison&body=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }
    
    // Open in a new window
    window.open(shareUrl, '_blank');
  };
  
  return (
    <div className="mt-6 pt-4 border-t">
      <h3 className="font-semibold mb-2">Share This Comparison</h3>
      <div className="flex gap-2">
        <button 
          onClick={() => shareToSocialMedia('twitter')}
          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded cursor-pointer"
        >
          Twitter
        </button>
        <button 
          onClick={() => shareToSocialMedia('facebook')}
          className="bg-blue-800 hover:bg-blue-900 text-white py-1 px-3 rounded cursor-pointer"
        >
          Facebook
        </button>
        <button 
          onClick={() => shareToSocialMedia('email')}
          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded cursor-pointer"
        >
          Email
        </button>
      </div>
    </div>
  );
};

export default SharingOptions;