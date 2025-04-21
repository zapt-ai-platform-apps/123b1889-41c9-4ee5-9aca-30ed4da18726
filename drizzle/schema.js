import { pgTable, serial, text, timestamp, integer, real, uuid, jsonb } from 'drizzle-orm/pg-core';

// Shoes table - stores all shoe models and their specifications
export const shoes = pgTable('shoes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  imageUrl: text('image_url'),
  weight: integer('weight'), // in grams
  drop: integer('drop'), // in mm
  cushionType: text('cushion_type'),
  runningType: text('running_type'),
  price: real('price'),
  estimatedLifespan: text('estimated_lifespan'),
  terrain: text('terrain'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Users table - stores user information and preferences
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  experienceLevel: text('experience_level'), // beginner, intermediate, advanced
  runningFrequency: text('running_frequency'), // occasional, regular, frequent
  runningType: text('running_type'), // road, trail, track, mixed
  weight: integer('weight'), // in kg
  height: integer('height'), // in cm
  footArch: text('foot_arch'), // flat, neutral, high
  pronation: text('pronation'), // overpronation, neutral, underpronation
  footWidth: text('foot_width'), // narrow, medium, wide
  goals: jsonb('goals'), // array of goals
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User preferences table - stores user preferences for shoe features
export const userPreferences = pgTable('user_preferences', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  cushioning: integer('cushioning'), // scale 1-10
  weight: integer('weight'), // scale 1-10
  stability: integer('stability'), // scale 1-10
  responsiveness: integer('responsiveness'), // scale 1-10
  durability: integer('durability'), // scale 1-10
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ShoeScores table - stores community ratings for shoes
export const shoeScores = pgTable('shoe_scores', {
  id: serial('id').primaryKey(),
  shoeId: integer('shoe_id').notNull().references(() => shoes.id),
  comfort: real('comfort'), // average rating 1-10
  stability: real('stability'), // average rating 1-10
  responsiveness: real('responsiveness'), // average rating 1-10
  durability: real('durability'), // average rating 1-10
  overall: real('overall'), // average rating 1-10
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reviews table - stores user reviews for shoes
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  shoeId: integer('shoe_id').notNull().references(() => shoes.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  rating: real('rating').notNull(), // 1-5 stars
  title: text('title'),
  content: text('content'),
  pros: jsonb('pros'), // array of pros tags
  cons: jsonb('cons'), // array of cons tags
  createdAt: timestamp('created_at').defaultNow(),
});

// SavedComparisons table - stores user-saved shoe comparisons
export const savedComparisons = pgTable('saved_comparisons', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  name: text('name'),
  shoes: jsonb('shoes'), // array of shoe IDs
  customColumns: jsonb('custom_columns'), // which columns user has selected
  createdAt: timestamp('created_at').defaultNow(),
});

// SharedComparisons table - stores links to shared comparisons
export const sharedComparisons = pgTable('shared_comparisons', {
  id: uuid('id').primaryKey(), // unique share ID for URL
  comparisionId: integer('comparison_id').references(() => savedComparisons.id),
  userId: uuid('user_id').references(() => users.id),
  shoes: jsonb('shoes'), // array of shoe IDs (needed for anonymous shares)
  customColumns: jsonb('custom_columns'), // which columns are selected
  expiresAt: timestamp('expires_at'), // optional expiration
  createdAt: timestamp('created_at').defaultNow(),
});