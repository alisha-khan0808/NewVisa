-- ============================================
-- NewVisa — Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counsellors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tool_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for content
CREATE POLICY "Public read countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Public read visa_categories" ON public.visa_categories FOR SELECT USING (true);
CREATE POLICY "Public read visa_services" ON public.visa_services FOR SELECT USING (true);
CREATE POLICY "Public read cms_pages" ON public.cms_pages FOR SELECT USING (published = true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public read blogs" ON public.blogs FOR SELECT USING (published = true);

-- Authenticated users can create eligibility assessments
CREATE POLICY "Users can create assessments" ON public.eligibility_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read own assessments" ON public.eligibility_assessments FOR SELECT USING (customer_id = auth.uid() OR customer_id IS NULL);
CREATE POLICY "Users can create consultations" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read own consultations" ON public.consultations FOR SELECT USING (customer_id = auth.uid());

-- Customer: read own data
CREATE POLICY "Customers read own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Customers read own leads" ON public.leads FOR SELECT USING (customer_id = auth.uid() OR customer_id IS NULL);
CREATE POLICY "Customers read own applications" ON public.applications FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers read own documents" ON public.documents FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers read own bookings" ON public.flight_bookings FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers read own hotel bookings" ON public.hotel_bookings FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers read own payments" ON public.payments FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers read own messages" ON public.messages FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());
CREATE POLICY "Customers read own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Customers read own AI conversations" ON public.ai_conversations FOR SELECT USING (customer_id = auth.uid());

-- Admin: full access
CREATE POLICY "Admins full access profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'counsellor', 'documentation_team', 'travel_admin', 'finance'))
);
CREATE POLICY "Admins full access leads" ON public.leads FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'counsellor', 'documentation_team'))
);
CREATE POLICY "Admins full access applications" ON public.applications FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'counsellor', 'documentation_team'))
);
CREATE POLICY "Admins full access documents" ON public.documents FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'documentation_team'))
);
CREATE POLICY "Admins full access consultations" ON public.consultations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'counsellor'))
);
CREATE POLICY "Admins full access payments" ON public.payments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'finance'))
);
CREATE POLICY "Admins full access bookings" ON public.flight_bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'travel_admin'))
);
CREATE POLICY "Admins full access hotel bookings" ON public.hotel_bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'travel_admin'))
);
CREATE POLICY "Admins full access cms" ON public.cms_pages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin'))
);
CREATE POLICY "Admins full access faqs" ON public.faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin'))
);
CREATE POLICY "Admins full access blogs" ON public.blogs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin'))
);
CREATE POLICY "Admins full access counsellors" ON public.counsellors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin'))
);
CREATE POLICY "Admins read assessments" ON public.eligibility_assessments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'immigration_admin', 'counsellor'))
);

-- Insert sample data
INSERT INTO public.countries (name, slug, flag_emoji, description, featured) VALUES
  ('Canada', 'canada', '🇨🇦', 'Express Entry, PNP, Study and Work permits', true),
  ('Australia', 'australia', '🇦🇺', 'Skilled Migration and Regional Opportunities', true),
  ('United Kingdom', 'uk', '🇬🇧', 'Skilled Worker Visa and Student Visa pathways', true),
  ('United States', 'usa', '🇺🇸', 'H-1B, Green Card, and EB-5 pathways', false),
  ('Germany', 'germany', '🇩🇪', 'EU Blue Card and Skilled Immigration', false),
  ('New Zealand', 'new-zealand', '🇳🇿', 'Skilled Migrant Category pathways', false),
  ('UAE', 'uae', '🇦🇪', 'Golden Visa and Employment opportunities', false),
  ('Singapore', 'singapore', '🇸🇬', 'Employment Pass and EntrePass', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.visa_categories (name, slug, description) VALUES
  ('Student Visa', 'student', 'Study abroad opportunities'),
  ('Work Visa', 'work', 'Employment opportunities overseas'),
  ('Skilled Immigration', 'skilled', 'Points-based immigration'),
  ('Visitor Visa', 'visitor', 'Tourism and short visits'),
  ('Business Visa', 'business', 'Business travel and investment'),
  ('Family Visa', 'family', 'Family sponsorship and reunion'),
  ('Permanent Residency', 'pr', 'Long-term residency'),
  ('Citizenship', 'citizenship', 'Naturalization pathway'),
  ('Dependent Visa', 'dependent', 'Accompanying family members'),
  ('Job Seeker Visa', 'job_seeker', 'Look for work abroad')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.faqs (question, answer, category, "order") VALUES
  ('What types of visas can I apply for?', 'We support applications for student, work, skilled immigration, visitor, business, family, permanent residency, and citizenship visas across 50+ countries.', 'General', 1),
  ('How long does the visa application process take?', 'Processing times vary by country and visa type. Typically, visitor visas take 2-4 weeks, while permanent residency applications can take 6-18 months.', 'Process', 2),
  ('What documents do I need for a visa application?', 'Required documents vary by country and visa type. Common documents include passport, photographs, education certificates, bank statements, and language test results.', 'Documents', 3),
  ('How can I check my eligibility?', 'Use our free online eligibility assessment tool. It takes about 5 minutes to complete and provides personalized recommendations.', 'General', 4),
  ('Do you offer consultation services?', 'Yes, we offer phone, video, and in-office consultations with our experienced immigration consultants.', 'Services', 5),
  ('Can I track my application status?', 'Yes, once you create an account, you can track your application status in real-time through your customer dashboard.', 'Process', 6),
  ('What payment methods do you accept?', 'We accept major credit/debit cards, bank transfers, and other secure payment methods.', 'Payments', 7),
  ('Can I book flights and hotels through NewVisa?', 'Yes! Once your visa is approved, you can search and book flights and hotels directly through our platform.', 'Travel', 8)
ON CONFLICT DO NOTHING;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;
