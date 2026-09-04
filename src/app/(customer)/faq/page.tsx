import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

const categories = [
  'General', 'Visa Process', 'Eligibility', 'Documents', 'Payments', 'Travel Booking',
];

const faqs = [
  { q: 'What types of visas can I apply for through NewVisa?', a: 'We support applications for student, work, skilled immigration, visitor, business, family, permanent residency, and citizenship visas across 50+ countries.' },
  { q: 'How long does the visa application process take?', a: 'Processing times vary by country and visa type. Typically, visitor visas take 2-4 weeks, while permanent residency applications can take 6-18 months. Your counsellor will provide specific timelines for your case.' },
  { q: 'What documents do I need for a visa application?', a: 'Required documents vary by country and visa type. Common documents include passport, photographs, education certificates, bank statements, and language test results. Our system will guide you based on your specific application.' },
  { q: 'How can I check my eligibility?', a: 'Use our free online eligibility assessment tool. It takes about 5 minutes to complete and will provide you with preliminary recommendations.' },
  { q: 'Do you offer consultation services?', a: 'Yes, we offer phone, video, and in-office consultations with our experienced immigration consultants. Book a consultation through our website.' },
  { q: 'Can I track my application status?', a: 'Yes, once you create an account, you can track your application status in real-time through your customer dashboard.' },
  { q: 'What payment methods do you accept?', a: 'We accept major credit/debit cards, bank transfers, and other secure payment methods. All transactions are encrypted and secure.' },
  { q: 'Can I book flights and hotels through NewVisa?', a: 'Yes! Once your visa is approved, you can search and book flights and hotels directly through our platform with live inventory and competitive rates.' },
];

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | NewVisa',
  description: 'Find answers to common questions about visa applications, immigration, and travel booking on NewVisa.',
};

export default function FAQPage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-12 w-12 text-accent-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Find answers to common questions about our visa and immigration services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
