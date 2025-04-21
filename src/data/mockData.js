// Example user profile for personalized matching
export const userProfile = {
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
  // Physical attributes
  weight: 68, // kg
  height: 175, // cm
  footArch: 'neutral', // 'flat', 'neutral', 'high'
  pronation: 'neutral', // 'overpronation', 'neutral', 'underpronation'
  footWidth: 'medium', // 'narrow', 'medium', 'wide'
  // Goals
  goals: ['improve_speed', 'long_distance'],
};

export const mockShoes = [
  {
    id: 1,
    name: 'Nike Air Zoom Pegasus 38',
    brand: 'Nike',
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/22be4756-f4e4-4486-9b23-a4c1133a20d1/pegasus-38-road-running-shoes-D1tCt2.png',
    weight: 275, // in grams
    drop: 10, // in mm
    cushionType: 'Responsive Foam',
    runningType: 'Road Running',
    price: 120,
    score: {
      overall: 87,
      comfort: 8.5,
      stability: 7.8,
      responsiveness: 8.2,
      durability: 8.0,
    },
    estimatedLifespan: '500-600 km',
    terrain: 'Road',
    reviews: {
      averageRating: 4.5,
      count: 2458,
      summary: 'Versatile daily trainer with good cushioning',
      mostMentionedPros: ['comfortable', 'durable', 'versatile'],
      mostMentionedCons: ['narrow toebox', 'weight']
    },
    matchScore: 85, // Match with user profile
  },
  {
    id: 2,
    name: 'Hoka Clifton 8',
    brand: 'Hoka',
    image: 'https://cdn.shopify.com/s/files/1/0020/8825/0027/files/HOKA_Clifton8_Men_s_BLUE_FLOWER_PROVINCIAL_BLUE_1.jpg',
    weight: 252, // in grams
    drop: 5, // in mm
    cushionType: 'Max Cushion',
    runningType: 'Road Running',
    price: 130,
    score: {
      overall: 89,
      comfort: 9.2,
      stability: 7.5,
      responsiveness: 7.0,
      durability: 8.3,
    },
    estimatedLifespan: '450-550 km',
    terrain: 'Road',
    reviews: {
      averageRating: 4.7,
      count: 1876,
      summary: 'Lightweight max-cushioned trainer for easy miles',
      mostMentionedPros: ['cushioning', 'lightweight', 'comfort'],
      mostMentionedCons: ['durability', 'stiffness']
    },
    matchScore: 92, // Match with user profile
  },
  {
    id: 3,
    name: 'Brooks Ghost 14',
    brand: 'Brooks',
    image: 'https://cdn.thewirecutter.com/wp-content/media/2022/07/runningshoes-2048px-5050.jpg',
    weight: 289, // in grams
    drop: 12, // in mm
    cushionType: 'Balanced Cushion',
    runningType: 'Road Running',
    price: 130,
    score: {
      overall: 88,
      comfort: 9.0,
      stability: 8.5,
      responsiveness: 7.5,
      durability: 9.0,
    },
    estimatedLifespan: '500-600 km',
    terrain: 'Road',
    reviews: {
      averageRating: 4.6,
      count: 3102,
      summary: 'Reliable everyday trainer with smooth transitions',
      mostMentionedPros: ['comfort', 'fit', 'reliability'],
      mostMentionedCons: ['heavy', 'breathability']
    },
    matchScore: 78, // Match with user profile
  },
  {
    id: 4,
    name: 'Saucony Endorphin Speed 2',
    brand: 'Saucony',
    image: 'https://www.saucony.com/dw/image/v2/BJLH_PRD/on/demandware.static/-/Sites-saucony-master/default/dwa2817daf/images/S20688-35/S20688-35_1.jpg',
    weight: 224, // in grams
    drop: 8, // in mm
    cushionType: 'Performance Foam',
    runningType: 'Performance/Race',
    price: 160,
    score: {
      overall: 92,
      comfort: 8.2,
      stability: 7.0,
      responsiveness: 9.5,
      durability: 7.8,
    },
    estimatedLifespan: '350-450 km',
    terrain: 'Road',
    reviews: {
      averageRating: 4.8,
      count: 1325,
      summary: 'Fast, versatile trainer for tempo runs and racing',
      mostMentionedPros: ['speed', 'responsiveness', 'lightweight'],
      mostMentionedCons: ['price', 'durability']
    },
    matchScore: 89, // Match with user profile
  },
  {
    id: 5,
    name: 'Asics Gel-Nimbus 23',
    brand: 'Asics',
    image: 'https://www.asics.com/dw/image/v2/BBTN_PRD/on/demandware.static/-/Sites-asics-product-catalog/default/dw2c746f88/images/hi-res/1011B098_100_SR_RT_GLB.png',
    weight: 310, // in grams
    drop: 10, // in mm
    cushionType: 'Gel Cushion',
    runningType: 'Road Running',
    price: 150,
    score: {
      overall: 86,
      comfort: 9.2,
      stability: 8.5,
      responsiveness: 7.2,
      durability: 9.0,
    },
    estimatedLifespan: '600-700 km',
    terrain: 'Road',
    reviews: {
      averageRating: 4.5,
      count: 1982,
      summary: 'Premium cushioned shoe for long distance comfort',
      mostMentionedPros: ['cushioning', 'comfort', 'durability'],
      mostMentionedCons: ['weight', 'price']
    },
    matchScore: 75, // Match with user profile
  }
];

// Column definitions for the comparison table
export const comparisonColumns = [
  { id: 'weight', label: 'Weight (g)', key: 'weight', type: 'numeric' },
  { id: 'drop', label: 'Drop (mm)', key: 'drop', type: 'numeric' },
  { id: 'cushionType', label: 'Cushioning', key: 'cushionType', type: 'text' },
  { id: 'runningType', label: 'Running Type', key: 'runningType', type: 'text' },
  { id: 'price', label: 'Price ($)', key: 'price', type: 'numeric' },
  { id: 'durability', label: 'Durability', key: 'score.durability', type: 'rating' },
  { id: 'comfort', label: 'Comfort', key: 'score.comfort', type: 'rating' },
  { id: 'stability', label: 'Stability', key: 'score.stability', type: 'rating' },
  { id: 'responsiveness', label: 'Responsiveness', key: 'score.responsiveness', type: 'rating' },
  { id: 'terrain', label: 'Terrain', key: 'terrain', type: 'text' },
];