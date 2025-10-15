-- IKK Design System Database Schema Migration
-- Create all tables for the application

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo TEXT,
  category TEXT NOT NULL,
  industry TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  total_campaigns INTEGER DEFAULT 0,
  average_reward NUMERIC DEFAULT 0,
  primary_platform TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table (with all 52 columns)
CREATE TABLE IF NOT EXISTS campaigns (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  brand_id VARCHAR NOT NULL REFERENCES brands(id),
  brand_name TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  
  -- Target audience
  target_gender TEXT,
  target_age_min INTEGER,
  target_age_max INTEGER,
  target_followers_min INTEGER,
  target_location TEXT,
  target_description TEXT,
  min_engagement_rate NUMERIC,
  min_average_views INTEGER,
  
  -- Content requirements
  content_format TEXT,
  content_posting_time TEXT,
  content_requirements TEXT,
  required_hashtags TEXT,
  content_type TEXT,
  
  -- Budget & rewards
  total_budget NUMERIC NOT NULL,
  reward_type TEXT NOT NULL,
  reward_per_koc NUMERIC NOT NULL,
  max_kocs INTEGER NOT NULL,
  has_sample_product BOOLEAN DEFAULT false,
  
  -- Timeline
  registration_deadline TIMESTAMP,
  koc_selection_deadline TIMESTAMP,
  start_date TIMESTAMP NOT NULL,
  content_submission_deadline TIMESTAMP,
  end_date TIMESTAMP NOT NULL,
  evaluation_deadline TIMESTAMP,
  
  -- Settings
  is_urgent BOOLEAN DEFAULT false,
  requires_approval BOOLEAN DEFAULT true,
  
  -- Terms & Usage Rights
  allow_marketing_use BOOLEAN DEFAULT false,
  marketing_usage_months INTEGER,
  require_product_return BOOLEAN DEFAULT false,
  product_return_instructions TEXT,
  guideline_url TEXT,
  brand_website TEXT,
  
  -- Platform & Progress
  platform TEXT NOT NULL,
  current_kocs INTEGER DEFAULT 0,
  approved_kocs INTEGER DEFAULT 0,
  pending_kocs INTEGER DEFAULT 0,
  rejected_kocs INTEGER DEFAULT 0,
  completed_kocs INTEGER DEFAULT 0,
  progress_percentage NUMERIC DEFAULT 0,
  
  -- Performance metrics
  total_views INTEGER DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,
  engagement_rate NUMERIC DEFAULT 0,
  
  -- Budget tracking
  spent_budget NUMERIC DEFAULT 0,
  remaining_budget NUMERIC DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KOC Profiles table
CREATE TABLE IF NOT EXISTS koc_profiles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  display_name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  platforms JSONB,
  total_followers INTEGER DEFAULT 0,
  engagement_rate NUMERIC DEFAULT 0,
  categories TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id VARCHAR NOT NULL REFERENCES campaigns(id),
  koc_id VARCHAR NOT NULL REFERENCES koc_profiles(id),
  status TEXT NOT NULL DEFAULT 'pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  content_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  avatar TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaigns_brand_id ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_platform ON campaigns(platform);
CREATE INDEX IF NOT EXISTS idx_applications_campaign_id ON applications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_applications_koc_id ON applications(koc_id);
CREATE INDEX IF NOT EXISTS idx_koc_profiles_user_id ON koc_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

