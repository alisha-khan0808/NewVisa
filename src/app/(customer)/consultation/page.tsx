import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Phone, Video, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { COUNTRY_SLUGS, VISA_CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Consultation — Immigration Experts | NewVisa',
  description: 'Schedule a consultation with our immigration experts for personalized visa guidance.',
};

const consultationTypes = [
  { value: 'phone_call', label: 'Phone Call', icon: Phone },
  { value: 'video', label: 'Video Consultation', icon: Video },
  { value: 'office', label: 'Office Visit', icon: MapPin },
];

export default function ConsultationPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-12 w-12 text-accent-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Book a Consultation</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Schedule a consultation with our immigration experts for personalized guidance on your visa application.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Book Your Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="input-field w-full" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="input-field w-full" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="input-field w-full" placeholder="+1 234 567 8900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Country</label>
                    <Select
                      placeholder="Select country"
                      options={[
                        { value: '', label: 'Select country' },
                        ...Object.entries(COUNTRY_SLUGS).map(([name, slug]) => ({ value: slug, label: name })),
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                    <Select
                      placeholder="Select visa type"
                      options={[
                        { value: '', label: 'Select visa type' },
                        ...VISA_CATEGORIES.map((cat) => ({ value: cat.id, label: cat.name })),
                      ]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input type="date" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <input type="time" className="input-field w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                  <Select
                    options={consultationTypes.map((t) => ({ value: t.value, label: t.label }))}
                  />
                </div>
                <div className="pt-4">
                  <Button type="button" className="w-full">Book Consultation</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
