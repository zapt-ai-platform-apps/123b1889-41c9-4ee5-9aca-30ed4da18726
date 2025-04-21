-- Create shoes table
CREATE TABLE IF NOT EXISTS "shoes" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "image_url" TEXT,
  "weight" INTEGER,
  "drop" INTEGER,
  "cushion_type" TEXT,
  "running_type" TEXT,
  "price" REAL,
  "estimated_lifespan" TEXT,
  "terrain" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "experience_level" TEXT,
  "running_frequency" TEXT,
  "running_type" TEXT,
  "weight" INTEGER,
  "height" INTEGER,
  "foot_arch" TEXT,
  "pronation" TEXT,
  "foot_width" TEXT,
  "goals" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS "user_preferences" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL REFERENCES "users"("id"),
  "cushioning" INTEGER,
  "weight" INTEGER,
  "stability" INTEGER,
  "responsiveness" INTEGER,
  "durability" INTEGER,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create shoe_scores table
CREATE TABLE IF NOT EXISTS "shoe_scores" (
  "id" SERIAL PRIMARY KEY,
  "shoe_id" INTEGER NOT NULL REFERENCES "shoes"("id"),
  "comfort" REAL,
  "stability" REAL,
  "responsiveness" REAL,
  "durability" REAL,
  "overall" REAL,
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS "reviews" (
  "id" SERIAL PRIMARY KEY,
  "shoe_id" INTEGER NOT NULL REFERENCES "shoes"("id"),
  "user_id" UUID NOT NULL REFERENCES "users"("id"),
  "rating" REAL NOT NULL,
  "title" TEXT,
  "content" TEXT,
  "pros" JSONB,
  "cons" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create saved_comparisons table
CREATE TABLE IF NOT EXISTS "saved_comparisons" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL REFERENCES "users"("id"),
  "name" TEXT,
  "shoes" JSONB,
  "custom_columns" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create shared_comparisons table
CREATE TABLE IF NOT EXISTS "shared_comparisons" (
  "id" UUID PRIMARY KEY,
  "comparison_id" INTEGER REFERENCES "saved_comparisons"("id"),
  "user_id" UUID REFERENCES "users"("id"),
  "shoes" JSONB,
  "custom_columns" JSONB,
  "expires_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW()
);