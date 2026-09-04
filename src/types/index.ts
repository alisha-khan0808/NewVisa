export type UserRole =
  | 'super_admin'
  | 'immigration_admin'
  | 'counsellor'
  | 'documentation_team'
  | 'travel_admin'
  | 'finance'
  | 'customer';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'documents_pending'
  | 'consultation_scheduled'
  | 'application_in_progress'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'closed';

export type ApplicationStatus =
  | 'draft'
  | 'documents_requested'
  | 'documents_submitted'
  | 'documents_verified'
  | 'prepared'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'closed';

export type DocumentStatus =
  | 'requested'
  | 'uploaded'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 're_upload_required';

export type ConsultationType = 'phone_call' | 'video' | 'office';

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type AIIntent =
  | 'support'
  | 'immigration'
  | 'eligibility'
  | 'document'
  | 'application'
  | 'travel'
  | 'escalation';

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  flag_emoji: string;
  description: string;
  image_url?: string;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface VisaCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface VisaService {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  eligibility: string;
  requirements: string;
  process: string;
  processing_time: string;
  country_id: string;
  category_id: string;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  lead_id: string;
  customer_id?: string;
  name: string;
  email: string;
  phone: string;
  country_of_residence: string;
  preferred_country: string;
  visa_type: string;
  immigration_objective: string;
  eligibility_status: string;
  source: string;
  assigned_counsellor_id?: string;
  status: LeadStatus;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  created_at: string;
  updated_at: string;
  last_contacted_at?: string;
  next_followup_at?: string;
}

export interface Counsellor {
  id: string;
  user_id: string;
  specialization: string[];
  assigned_countries: string[];
  bio?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  application_id: string;
  lead_id: string;
  customer_id: string;
  visa_service_id?: string;
  assigned_counsellor_id?: string;
  status: ApplicationStatus;
  notes?: string;
  submitted_at?: string;
  decision_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  document_id: string;
  application_id: string;
  customer_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  status: DocumentStatus;
  remarks?: string;
  uploaded_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface Consultation {
  id: string;
  consultation_id: string;
  lead_id: string;
  customer_id: string;
  counsellor_id?: string;
  consultation_type: ConsultationType;
  preferred_date: string;
  preferred_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  notes?: string;
  meeting_link?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  payment_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  transaction_id?: string;
  gateway: string;
  status: PaymentStatus;
  payment_type: string;
  related_id?: string;
  related_type?: string;
  paid_at?: string;
  refunded_at?: string;
  created_at: string;
}

export interface FlightBooking {
  id: string;
  booking_id: string;
  customer_id: string;
  supplier_booking_id?: string;
  from_airport: string;
  to_airport: string;
  departure_date: string;
  return_date?: string;
  trip_type: 'one_way' | 'round_trip' | 'multi_city';
  passengers: number;
  cabin_class: string;
  flight_details: Record<string, unknown>;
  fare: number;
  markup: number;
  total: number;
  currency: string;
  status: BookingStatus;
  eticket_url?: string;
  created_at: string;
  updated_at: string;
}

export interface HotelBooking {
  id: string;
  booking_id: string;
  customer_id: string;
  supplier_booking_id?: string;
  hotel_id: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  rooms: number;
  adults: number;
  children: number;
  room_details: Record<string, unknown>;
  rate: number;
  markup: number;
  total: number;
  currency: string;
  status: BookingStatus;
  voucher_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TravelBooking {
  id: string;
  booking_id: string;
  customer_id: string;
  flight_booking_id?: string;
  hotel_booking_id?: string;
  total_amount: number;
  currency: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface AIConversation {
  id: string;
  conversation_id: string;
  customer_id?: string;
  session_id: string;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  intent?: AIIntent;
  agent_used?: string;
  tool_calls?: unknown[];
  created_at: string;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EligibilityAssessment {
  id: string;
  assessment_id: string;
  customer_id?: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  country_of_residence: string;
  preferred_country: string;
  preferred_city?: string;
  immigration_objective: string;
  education_level?: string;
  university?: string;
  field_of_study?: string;
  graduation_year?: string;
  occupation?: string;
  total_experience?: string;
  industry?: string;
  employer?: string;
  job_position?: string;
  language_test?: string;
  language_score?: number;
  individual_scores?: Record<string, number>;
  annual_income?: number;
  available_funds?: number;
  sponsorship_info?: string;
  recommended_visa?: string;
  result?: string;
  lead_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface EligibilityFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  country_of_residence: string;
  // Step 2
  preferred_country: string;
  preferred_city: string;
  immigration_objective: string;
  // Step 3
  education_level: string;
  university: string;
  field_of_study: string;
  graduation_year: string;
  // Step 4
  occupation: string;
  total_experience: string;
  industry: string;
  employer: string;
  job_position: string;
  // Step 5
  language_test: string;
  language_score: string;
  // Step 6
  annual_income: string;
  available_funds: string;
  sponsorship_info: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  visa_type: string;
  preferred_date: string;
  preferred_time: string;
  consultation_type: ConsultationType;
}
