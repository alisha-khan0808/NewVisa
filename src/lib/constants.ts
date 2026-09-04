export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  IMMIGRATION_ADMIN: 'immigration_admin',
  COUNSELLOR: 'counsellor',
  DOCUMENTATION_TEAM: 'documentation_team',
  TRAVEL_ADMIN: 'travel_admin',
  FINANCE: 'finance',
  CUSTOMER: 'customer',
} as const;

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  DOCUMENTS_PENDING: 'documents_pending',
  CONSULTATION_SCHEDULED: 'consultation_scheduled',
  APPLICATION_IN_PROGRESS: 'application_in_progress',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
} as const;

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  DOCUMENTS_REQUESTED: 'documents_requested',
  DOCUMENTS_SUBMITTED: 'documents_submitted',
  DOCUMENTS_VERIFIED: 'documents_verified',
  PREPARED: 'prepared',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
} as const;

export const DOCUMENT_STATUS = {
  REQUESTED: 'requested',
  UPLOADED: 'uploaded',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  RE_UPLOAD_REQUIRED: 're_upload_required',
} as const;

export const CONSULTATION_TYPE = {
  PHONE_CALL: 'phone_call',
  VIDEO: 'video',
  OFFICE: 'office',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const AI_INTENT = {
  SUPPORT: 'support',
  IMMIGRATION: 'immigration',
  ELIGIBILITY: 'eligibility',
  DOCUMENT: 'document',
  APPLICATION: 'application',
  TRAVEL: 'travel',
  ESCALATION: 'escalation',
} as const;

export const COUNTRY_SLUGS: Record<string, string> = {
  'Canada': 'canada',
  'Australia': 'australia',
  'United Kingdom': 'uk',
  'United States': 'usa',
  'Germany': 'germany',
  'New Zealand': 'new-zealand',
  'UAE': 'uae',
  'Dubai': 'uae',
  'Singapore': 'singapore',
  'Ireland': 'ireland',
};

export const VISA_CATEGORIES = [
  { id: 'student', name: 'Student Visa', description: 'Study abroad opportunities' },
  { id: 'work', name: 'Work Visa', description: 'Employment opportunities overseas' },
  { id: 'skilled', name: 'Skilled Immigration', description: 'Points-based immigration' },
  { id: 'visitor', name: 'Visitor Visa', description: 'Tourism and short visits' },
  { id: 'business', name: 'Business Visa', description: 'Business travel and investment' },
  { id: 'family', name: 'Family Visa', description: 'Family sponsorship and reunion' },
  { id: 'pr', name: 'Permanent Residency', description: 'Long-term residency' },
  { id: 'citizenship', name: 'Citizenship', description: 'Naturalization pathway' },
  { id: 'dependent', name: 'Dependent Visa', description: 'Accompanying family members' },
  { id: 'job_seeker', name: 'Job Seeker Visa', description: 'Look for work abroad' },
];
