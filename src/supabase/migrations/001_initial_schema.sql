-- ============================================
-- NewVisa — Initial Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Profiles (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('super_admin', 'immigration_admin', 'counsellor', 'documentation_team', 'travel_admin', 'finance', 'customer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Countries
-- ============================================
CREATE TABLE IF NOT EXISTS public.countries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  flag_emoji TEXT,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Visa Categories
-- ============================================
CREATE TABLE IF NOT EXISTS public.visa_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Visa Services
-- ============================================
CREATE TABLE IF NOT EXISTS public.visa_services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  overview TEXT,
  eligibility TEXT,
  requirements TEXT,
  process TEXT,
  processing_time TEXT,
  country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.visa_categories(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(country_id, slug)
);

-- ============================================
-- Leads
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_of_residence TEXT NOT NULL,
  preferred_country TEXT NOT NULL,
  visa_type TEXT NOT NULL,
  immigration_objective TEXT NOT NULL,
  eligibility_status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'website',
  assigned_counsellor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'documents_pending', 'consultation_scheduled', 'application_in_progress', 'submitted', 'under_review', 'approved', 'rejected', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ
);

-- ============================================
-- Counsellors
-- ============================================
CREATE TABLE IF NOT EXISTS public.counsellors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  specialization TEXT[] DEFAULT '{}',
  assigned_countries TEXT[] DEFAULT '{}',
  bio TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Applications
-- ============================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id TEXT NOT NULL UNIQUE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE RESTRICT NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  visa_service_id UUID REFERENCES public.visa_services(id) ON DELETE SET NULL,
  assigned_counsellor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'documents_requested', 'documents_submitted', 'documents_verified', 'prepared', 'submitted', 'under_review', 'approved', 'rejected', 'closed')),
  notes TEXT,
  submitted_at TIMESTAMPTZ,
  decision_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Application Status History
-- ============================================
CREATE TABLE IF NOT EXISTS public.application_status_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Documents
-- ============================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  document_id TEXT NOT NULL UNIQUE,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'uploaded', 'under_review', 'approved', 'rejected', 're_upload_required')),
  remarks TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ============================================
-- Document Requests
-- ============================================
CREATE TABLE IF NOT EXISTS public.document_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL,
  requested_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  remarks TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Consultations
-- ============================================
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consultation_id TEXT NOT NULL UNIQUE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  counsellor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  consultation_type TEXT NOT NULL DEFAULT 'phone_call' CHECK (consultation_type IN ('phone_call', 'video', 'office')),
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'missed')),
  notes TEXT,
  meeting_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Messages
-- ============================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Notifications
-- ============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Payments
-- ============================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  payment_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  transaction_id TEXT,
  gateway TEXT DEFAULT 'stripe',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'partially_refunded')),
  payment_type TEXT NOT NULL,
  related_id TEXT,
  related_type TEXT,
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Flight Bookings
-- ============================================
CREATE TABLE IF NOT EXISTS public.flight_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  supplier_booking_id TEXT,
  from_airport TEXT NOT NULL,
  to_airport TEXT NOT NULL,
  departure_date TEXT NOT NULL,
  return_date TEXT,
  trip_type TEXT NOT NULL DEFAULT 'one_way' CHECK (trip_type IN ('one_way', 'round_trip', 'multi_city')),
  passengers INTEGER NOT NULL DEFAULT 1,
  cabin_class TEXT DEFAULT 'economy',
  flight_details JSONB DEFAULT '{}',
  fare DECIMAL(10, 2) NOT NULL,
  markup DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  eticket_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Hotel Bookings
-- ============================================
CREATE TABLE IF NOT EXISTS public.hotel_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  supplier_booking_id TEXT,
  hotel_id TEXT NOT NULL,
  hotel_name TEXT NOT NULL,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  rooms INTEGER NOT NULL DEFAULT 1,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER DEFAULT 0,
  room_details JSONB DEFAULT '{}',
  rate DECIMAL(10, 2) NOT NULL,
  markup DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  voucher_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Travel Bookings (Flight + Hotel Bundle)
-- ============================================
CREATE TABLE IF NOT EXISTS public.travel_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  flight_booking_id UUID REFERENCES public.flight_bookings(id) ON DELETE SET NULL,
  hotel_booking_id UUID REFERENCES public.hotel_bookings(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- AI Conversations
-- ============================================
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- AI Messages
-- ============================================
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  intent TEXT,
  agent_used TEXT,
  tool_calls JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- AI Tool Logs
-- ============================================
CREATE TABLE IF NOT EXISTS public.ai_tool_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  parameters JSONB,
  result JSONB,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- CMS Pages
-- ============================================
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- FAQs
-- ============================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Blogs
-- ============================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Eligibility Assessments
-- ============================================
CREATE TABLE IF NOT EXISTS public.eligibility_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  assessment_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  country_of_residence TEXT NOT NULL,
  preferred_country TEXT NOT NULL,
  preferred_city TEXT,
  immigration_objective TEXT NOT NULL,
  education_level TEXT,
  university TEXT,
  field_of_study TEXT,
  graduation_year TEXT,
  occupation TEXT,
  total_experience TEXT,
  industry TEXT,
  employer TEXT,
  job_position TEXT,
  language_test TEXT,
  language_score DECIMAL(4, 1),
  individual_scores JSONB,
  annual_income DECIMAL(12, 2),
  available_funds DECIMAL(12, 2),
  sponsorship_info TEXT,
  recommended_visa TEXT,
  result TEXT,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Audit Logs
-- ============================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Suppliers (for travel API integration)
-- ============================================
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('flight', 'hotel')),
  api_key TEXT,
  api_secret TEXT,
  base_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Markup Rules
-- ============================================
CREATE TABLE IF NOT EXISTS public.markup_rules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('fixed', 'percentage')),
  value DECIMAL(10, 2) NOT NULL,
  applies_to TEXT NOT NULL CHECK (applies_to IN ('flight', 'hotel', 'all')),
  country TEXT,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Fix typo
DROP TABLE IF EXISTS public.markup_rules CASCADE;
CREATE TABLE public.markup_rules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('fixed', 'percentage')),
  value DECIMAL(10, 2) NOT NULL,
  applies_to TEXT NOT NULL CHECK (applies_to IN ('flight', 'hotel', 'all')),
  country TEXT,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_counsellor ON public.leads(assigned_counsellor_id);
CREATE INDEX IF NOT EXISTS idx_applications_customer ON public.applications(customer_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_documents_customer ON public.documents(customer_id);
CREATE INDEX IF NOT EXISTS idx_consultations_customer ON public.consultations(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON public.payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_flight_bookings_customer ON public.flight_bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_hotel_bookings_customer ON public.hotel_bookings(customer_id);
