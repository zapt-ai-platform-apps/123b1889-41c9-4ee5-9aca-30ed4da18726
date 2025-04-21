/**
 * Match Score Algorithm - Pseudocode Implementation
 * 
 * This file contains a simple implementation of the algorithm used to calculate
 * the "match score" between a user's profile and a running shoe.
 */

// Example user profile
const userProfile = {
  experienceLevel: 'intermediate', // 'beginner', 'intermediate', 'advanced'
  runningFrequency: 'regular', // 'occasional', 'regular', 'frequent'
  runningType: 'road', // 'road', 'trail', 'track', 'mixed'
  preferences: {
    cushioning: 8, // scale 1-10
    weight: 4, // scale 1-10 (lower is lighter)
    stability: 6, // scale 1-10
    responsiveness: 7, // scale 1-10
    durability: 5, // scale 1-10
  },
  footArch: 'neutral', // 'flat', 'neutral', 'high'
  pronation: 'neutral', // 'overpronation', 'neutral', 'underpronation'
  footWidth: 'medium', // 'narrow', 'medium', 'wide'
  // Goals
  goals: ['improve_speed', 'long_distance'],
};

// Example shoe data
const shoeExample = {
  weight: 275, // in grams
  drop: 10, // in mm
  cushionType: 'Responsive Foam',
  runningType: 'Road Running',
  terrain: 'Road',
  score: {
    comfort: 8.5,
    stability: 7.8,
    responsiveness: 8.2,
    durability: 8.0,
  },
  reviews: {
    // Review data here
    similarUsers: {
      averageRating: 4.2,
      count: 156
    }
  }
};

/**
 * Calculate the technical match score between user preferences and shoe specifications
 * @param {Object} userProfile - User profile and preferences
 * @param {Object} shoe - Shoe technical specifications
 * @returns {number} Technical match score (0-100)
 */
function calculateTechnicalMatch(userProfile, shoe) {
  let score = 0;
  let maxScore = 0;
  
  // Match running type/terrain
  if (userProfile.runningType === 'road' && shoe.terrain.toLowerCase().includes('road')) {
    score += 20;
  } else if (userProfile.runningType === 'trail' && shoe.terrain.toLowerCase().includes('trail')) {
    score += 20;
  } else if (userProfile.runningType === 'track' && shoe.terrain.toLowerCase().includes('track')) {
    score += 20;
  } else if (userProfile.runningType === 'mixed') {
    // For mixed runners, any terrain is acceptable but versatile shoes score better
    score += 10;
    if (shoe.terrain.toLowerCase().includes('mixed') || shoe.terrain.toLowerCase().includes('all')) {
      score += 10;
    }
  }
  maxScore += 20;
  
  // Match cushioning preference
  const cushioningScore = 20 - Math.abs(userProfile.preferences.cushioning - shoe.score.comfort) * 2;
  score += Math.max(0, cushioningScore);
  maxScore += 20;
  
  // Match stability preference
  const stabilityScore = 20 - Math.abs(userProfile.preferences.stability - shoe.score.stability) * 2;
  score += Math.max(0, stabilityScore);
  maxScore += 20;
  
  // Match responsiveness preference
  const responsivenessScore = 20 - Math.abs(userProfile.preferences.responsiveness - shoe.score.responsiveness) * 2;
  score += Math.max(0, responsivenessScore);
  maxScore += 20;
  
  // Match durability preference
  const durabilityScore = 20 - Math.abs(userProfile.preferences.durability - shoe.score.durability) * 2;
  score += Math.max(0, durabilityScore);
  maxScore += 20;
  
  // Additional factors based on pronation
  if (userProfile.pronation === 'overpronation' && shoe.cushionType.toLowerCase().includes('stability')) {
    score += 10;
  } else if (userProfile.pronation === 'underpronation' && shoe.cushionType.toLowerCase().includes('cushion')) {
    score += 10;
  }
  maxScore += 10;
  
  // Weight preference (lower score = preference for lighter shoes)
  let weightScore;
  if (userProfile.preferences.weight <= 3) { // Strong preference for light shoes
    weightScore = 10 - (shoe.weight - 200) / 20; // Penalize heavier shoes more
  } else if (userProfile.preferences.weight >= 7) { // Preference for substantial shoes
    weightScore = 10 - (300 - shoe.weight) / 20; // Penalize lighter shoes more
  } else { // Moderate weight preference
    weightScore = 10 - Math.abs(shoe.weight - 250) / 20;
  }
  score += Math.max(0, weightScore);
  maxScore += 10;
  
  // Special case for goals
  if (userProfile.goals.includes('improve_speed') && 
      (shoe.cushionType.toLowerCase().includes('responsive') || 
       shoe.runningType.toLowerCase().includes('performance'))) {
    score += 10;
  } else if (userProfile.goals.includes('long_distance') && 
            (shoe.cushionType.toLowerCase().includes('cushion') || 
             shoe.runningType.toLowerCase().includes('distance'))) {
    score += 10;
  }
  maxScore += 10;
  
  // Normalize to 0-100 scale
  return Math.round((score / maxScore) * 100);
}

/**
 * Calculate the community feedback score based on reviews from similar users
 * @param {Object} userProfile - User profile and preferences
 * @param {Object} shoe - Shoe review data
 * @returns {number} Community feedback score (0-100)
 */
function calculateCommunityFeedback(userProfile, shoe) {
  // Simple implementation: scale the average rating (1-5) to 0-100
  // In a real implementation, you would filter reviews by users with similar profiles
  const similarUsersRating = shoe.reviews.similarUsers.averageRating || 0;
  const reviewCount = shoe.reviews.similarUsers.count || 0;
  
  // Weight the score by the number of reviews (more reviews = more reliable)
  let confidenceFactor = Math.min(reviewCount / 100, 1); // Max out at 100 reviews
  
  return Math.round((similarUsersRating / 5) * 100 * confidenceFactor);
}

/**
 * Calculate the preference alignment score
 * @param {Object} userProfile - User preferences
 * @param {Object} shoe - Shoe ratings
 * @returns {number} Preference alignment score (0-100)
 */
function calculatePreferenceAlignment(userProfile, shoe) {
  // Calculate how well the shoe aligns with the user's most important preferences
  let totalDifference = 0;
  let preferencesCount = 0;
  
  // Calculate weighted difference for each preference
  Object.entries(userProfile.preferences).forEach(([key, value]) => {
    let shoeValue;
    
    switch(key) {
      case 'cushioning':
        shoeValue = shoe.score.comfort;
        break;
      case 'stability':
        shoeValue = shoe.score.stability;
        break;
      case 'responsiveness':
        shoeValue = shoe.score.responsiveness;
        break;
      case 'durability':
        shoeValue = shoe.score.durability;
        break;
      case 'weight':
        // Transform weight in grams to a 1-10 scale (higher = heavier)
        shoeValue = Math.min(10, Math.max(1, (shoe.weight - 150) / 30));
        break;
      default:
        shoeValue = 5; // Default middle value
    }
    
    // Calculate difference (0-9 scale)
    const difference = Math.abs(value - shoeValue);
    totalDifference += difference;
    preferencesCount++;
  });
  
  // Average difference (0-9 scale)
  const avgDifference = totalDifference / preferencesCount;
  
  // Convert to a 0-100 score (0 difference = 100 score)
  return Math.round(Math.max(0, 100 - (avgDifference * 100) / 9));
}

/**
 * Calculate the overall match score
 * @param {Object} userProfile - User profile and preferences
 * @param {Object} shoe - Shoe data
 * @returns {number} Overall match score (0-100)
 */
function calculateMatchScore(userProfile, shoe) {
  // Calculate individual components
  const technicalScore = calculateTechnicalMatch(userProfile, shoe);
  const communityScore = calculateCommunityFeedback(userProfile, shoe);
  const preferenceScore = calculatePreferenceAlignment(userProfile, shoe);
  
  // Weight the components
  const weightedScore = 
    (technicalScore * 0.4) +
    (communityScore * 0.3) +
    (preferenceScore * 0.3);
  
  return Math.round(weightedScore);
}

// Example usage
// const matchScore = calculateMatchScore(userProfile, shoeExample);
// console.log(`Match Score: ${matchScore}%`);

export default calculateMatchScore;