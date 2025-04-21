# Running Shoes Comparison Tool

A comprehensive application for comparing running shoes based on technical specifications, community reviews, and personalized matching.

## Features

- Compare up to 4 shoes side-by-side
- Customizable comparison columns
- Personalized match scores based on user profiles
- Community reviews integration
- Save and share comparisons

## Database Structure

The database consists of several interconnected tables:

- **shoes** - Stores technical specifications for all shoe models
- **users** - Stores user profiles and running preferences
- **user_preferences** - Stores user preferences for shoe features
- **shoe_scores** - Aggregated community ratings by category
- **reviews** - Individual user reviews with pros/cons tags
- **saved_comparisons** - User-saved shoe comparisons
- **shared_comparisons** - Publicly shared comparison links

## Match Algorithm

The personalized match score is calculated using:

1. **Technical Match (40%)** - How well shoe specs match user needs
2. **Community Feedback (30%)** - How similar users rated the shoe
3. **Preference Alignment (30%)** - How closely the shoe matches user preferences

## API Endpoints

- `GET /api/shoes` - Get all available shoes
- `GET /api/shoes/:id` - Get details for a specific shoe
- `GET /api/shoes/compare` - Get comparison data for multiple shoes
- `GET /api/users/:id/profile` - Get user profile and preferences
- `POST /api/users/:id/preferences` - Update user preferences
- `GET /api/reviews/shoe/:id` - Get reviews for a specific shoe
- `POST /api/comparisons/save` - Save a comparison
- `POST /api/comparisons/share` - Generate shareable link
- `GET /api/comparisons/:id` - Get a saved or shared comparison

## Implementation Strategy

1. Core comparison UI and shoe selection components
2. Database structure implementation
3. Basic matching algorithm
4. User preferences and profiles
5. Reviews integration
6. Save/share functionality
7. Performance optimizations

## Technical Challenges

- Responsive display of comparison data across devices
- Efficient calculation of match scores
- Optimizing database queries for complex joins
- Managing community review data at scale

## Potential Enhancements

- AR visualization of shoes
- Gait analysis integration
- Price tracking and alerts
- Advanced filtering based on running habits
- Integration with running tracker apps