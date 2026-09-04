'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ChevronRight, ChevronLeft, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/client';

const steps = [
  { id: 1, title: 'Personal', fields: ['name', 'email', 'phone', 'dob'] },
  { id: 2, title: 'Destination', fields: ['preferred_country', 'preferred_city', 'objective'] },
  { id: 3, title: 'Education', fields: ['education_level', 'university', 'field_of_study', 'graduation_year'] },
  { id: 4, title: 'Work', fields: ['occupation', 'experience', 'industry', 'employer'] },
  { id: 5, title: 'Language', fields: ['language_test', 'language_score', 'individual_scores'] },
  { id: 6, title: 'Financial', fields: ['annual_income', 'available_funds', 'sponsorship'] },
];

const countries = [
  'Canada', 'Australia', 'United Kingdom', 'United States', 'Germany',
  'New Zealand', 'Ireland', 'Singapore', 'UAE', 'Saudi Arabia',
  'Netherlands', 'Sweden', 'Portugal', 'Spain', 'Other',
];

const objectives = [
  'Work Abroad', 'Study Abroad', 'Permanent Residency', 'Business Immigration',
  'Visit/Tourism', 'Family Sponsorship', 'Citizenship', 'Dependent Visa',
];

const educationLevels = [
  'High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate/PhD', 'Professional Degree',
];

const languageTests = [
  'IELTS', 'PTE', 'TOEFL', 'CELPIP', 'Duolingo', 'Not Taken',
];

export default function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    preferred_country: '',
    preferred_city: '',
    objective: '',
    education_level: '',
    university: '',
    field_of_study: '',
    graduation_year: '',
    occupation: '',
    experience: '',
    industry: '',
    employer: '',
    job_position: '',
    language_test: '',
    language_score: '',
    individual_scores: '',
    annual_income: '',
    available_funds: '',
    sponsorship: '',
  });

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    const step = steps[currentStep];
    const requiredFields: Record<number, string[]> = {
      0: ['name', 'email', 'phone', 'dob'],
      1: ['preferred_country', 'objective'],
      2: ['education_level'],
      3: ['occupation'],
      5: ['available_funds'],
    };
    const required = requiredFields[currentStep] || [];
    return required.every(f => form[f].trim() !== '');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        ...form,
        customer_id: user?.id || null,
        language_score: form.language_score ? parseFloat(form.language_score) : null,
        annual_income: form.annual_income ? parseFloat(form.annual_income) : null,
        available_funds: form.available_funds ? parseFloat(form.available_funds) : null,
        immigration_objective: form.objective,
      };

      const { error } = await supabase.from('eligibility_assessments').insert([payload]);
      if (error) throw error;

      // Also create a lead
      const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
      await supabase.from('leads').insert([{
        lead_id: leadId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country_of_residence: countries.includes(form.preferred_country) ? form.preferred_country : 'Other',
        preferred_country: form.preferred_country,
        visa_type: form.objective,
        immigration_objective: form.objective,
        eligibility_status: 'pending',
        source: 'eligibility_assessment',
        status: 'new',
        priority: 'medium',
      }]);

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Assessment Submitted!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for completing your eligibility assessment. One of our expert counsellors will review your profile and contact you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => router.push('/consultation')}>Book a Consultation</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-900 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Eligibility Assessment</h1>
          <p className="text-primary-200">
            Complete the form below and get personalized recommendations for your immigration journey.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`
                  h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${i < currentStep ? 'bg-green-100 text-green-700' : i === currentStep ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}
                `}>
                  {i < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <span className={`hidden sm:block text-sm ${i <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  {step.title}
                </span>
                {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-16 mx-1 ${i < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              {currentStep === 0 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <Input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <Input type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} required />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Your Destination</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Country *</label>
                    <select
                      value={form.preferred_country}
                      onChange={(e) => update('preferred_country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred City</label>
                    <Input value={form.preferred_city} onChange={(e) => update('preferred_city', e.target.value)} placeholder="e.g. Toronto, Sydney" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Immigration Objective *</label>
                    <select
                      value={form.objective}
                      onChange={(e) => update('objective', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select objective</option>
                      {objectives.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Education Background</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification *</label>
                    <select
                      value={form.education_level}
                      onChange={(e) => update('education_level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select qualification</option>
                      {educationLevels.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University / College</label>
                    <Input value={form.university} onChange={(e) => update('university', e.target.value)} placeholder="e.g. Delhi University" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <Input value={form.field_of_study} onChange={(e) => update('field_of_study', e.target.value)} placeholder="e.g. Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    <Input type="number" value={form.graduation_year} onChange={(e) => update('graduation_year', e.target.value)} placeholder="e.g. 2020" min="1970" max="2030" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
                    <Input value={form.occupation} onChange={(e) => update('occupation', e.target.value)} placeholder="e.g. Software Engineer" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience (years)</label>
                    <Input type="number" value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="e.g. 5" min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select value={form.industry} onChange={(e) => update('industry', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select industry</option>
                      <option>IT / Software</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Engineering</option>
                      <option>Education</option>
                      <option>Manufacturing</option>
                      <option>Retail</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Employer</label>
                    <Input value={form.employer} onChange={(e) => update('employer', e.target.value)} placeholder="e.g. Google" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                    <Input value={form.job_position} onChange={(e) => update('job_position', e.target.value)} placeholder="e.g. Senior Developer" />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Language Proficiency</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language Test</label>
                    <select value={form.language_test} onChange={(e) => update('language_test', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select test</option>
                      {languageTests.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {form.language_test && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Overall Score</label>
                        <Input type="number" step="0.5" value={form.language_score} onChange={(e) => update('language_score', e.target.value)} placeholder="e.g. 7.5" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Individual Scores (Reading, Writing, Listening, Speaking)</label>
                        <Input value={form.individual_scores} onChange={(e) => update('individual_scores', e.target.value)} placeholder="e.g. 7.0, 7.5, 8.0, 7.0" />
                      </div>
                    </>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (INR)</label>
                    <Input type="number" value={form.annual_income} onChange={(e) => update('annual_income', e.target.value)} placeholder="e.g. 1200000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Funds (INR) *</label>
                    <Input type="number" value={form.available_funds} onChange={(e) => update('available_funds', e.target.value)} placeholder="e.g. 5000000" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sponsorship Information</label>
                    <textarea
                      value={form.sponsorship}
                      onChange={(e) => update('sponsorship', e.target.value)}
                      placeholder="e.g. Sponsored by my employer, Family sponsorship, Self-funded..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[100px] resize-y"
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button onClick={() => setCurrentStep(s => s + 1)} disabled={!canProceed()}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} loading={submitting}>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Assessment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
