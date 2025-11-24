/*
  # Smart Price Tracker Database Schema

  ## Overview
  Creates the core database schema for the Smart Price Tracker application,
  including user authentication and product price comparison functionality.

  ## Tables Created

  ### 1. users
  Stores user account information for authentication
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email address
  - `password` (text) - Hashed password using bcrypt
  - `name` (text) - User's full name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. products
  Main product catalog with aggregated information
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `image` (text) - Product image URL
  - `description` (text) - Product description
  - `rating` (decimal) - Average product rating (0-5)
  - `category` (text) - Product category
  - `is_trending` (boolean) - Flag for trending products
  - `created_at` (timestamptz) - Product creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. price_data
  Current prices across different e-commerce platforms
  - `id` (uuid, primary key) - Unique price entry identifier
  - `product_id` (uuid, foreign key) - References products table
  - `platform` (text) - Platform name (Amazon, Flipkart, Myntra, etc.)
  - `price` (decimal) - Current price
  - `discount` (text) - Discount percentage or amount
  - `delivery` (text) - Delivery time estimate
  - `url` (text) - Direct product URL on platform
  - `created_at` (timestamptz) - Entry creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. price_history
  Historical price tracking for trend analysis
  - `id` (uuid, primary key) - Unique history entry identifier
  - `product_id` (uuid, foreign key) - References products table
  - `platform` (text) - Platform name
  - `price` (decimal) - Historical price point
  - `date` (timestamptz) - Price record date
  - `created_at` (timestamptz) - Entry creation timestamp

  ### 5. reviews
  User reviews and ratings for products
  - `id` (uuid, primary key) - Unique review identifier
  - `product_id` (uuid, foreign key) - References products table
  - `user_id` (uuid, foreign key) - References users table
  - `rating` (integer) - User rating (1-5)
  - `comment` (text) - Review text
  - `created_at` (timestamptz) - Review creation timestamp

  ## Security

  1. Row Level Security (RLS) enabled on all tables
  2. Users table policies:
     - Users can view their own profile
     - Users can update their own profile
  3. Products, price_data, price_history tables:
     - Public read access for all authenticated and anonymous users
  4. Reviews table:
     - Public read access
     - Authenticated users can create reviews
     - Users can update/delete their own reviews

  ## Indexes
  - Product search by name
  - Price lookups by product
  - Review lookups by product
  - Price history by product and date
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  rating decimal(3,2) DEFAULT 0.00,
  category text NOT NULL,
  is_trending boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create price_data table
CREATE TABLE IF NOT EXISTS price_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  platform text NOT NULL,
  price decimal(10,2) NOT NULL,
  discount text DEFAULT '',
  delivery text DEFAULT '',
  url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create price_history table
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  platform text NOT NULL,
  price decimal(10,2) NOT NULL,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_price_data_product_id ON price_data(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_product_id ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_date ON price_history(date);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for products table (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for price_data table (public read)
CREATE POLICY "Anyone can view price data"
  ON price_data FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for price_history table (public read)
CREATE POLICY "Anyone can view price history"
  ON price_history FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);