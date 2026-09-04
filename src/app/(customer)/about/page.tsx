import { Metadata } from 'next';
import Link from 'next/link';
import { Info, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — NewVisa Immigration & Travel Platform',
  description: 'Learn about NewVisa — your trusted partner for immigration, visa services, and travel booking.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Info className="h-12 w-12 text-accent-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">About NewVisa</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Your trusted partner for immigration, visa services, and travel booking.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              NewVisa is a unified Visa, Immigration & Travel Booking platform designed to make international mobility simpler and more accessible. We bring together immigration consultancy, visa application management, flight booking, and hotel booking into one intelligent platform.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Our Mission</h3>
            <p>
              To make the journey abroad simpler by bringing immigration, visa assistance, and travel booking into one intelligent platform. We believe that everyone deserves access to expert guidance and seamless booking experiences when planning their international journey.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Our Vision</h3>
            <p>
              To become the single digital destination for customers planning to move, study, work, visit, or travel internationally. From exploration to travel, we are with you at every step.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-8">Contact Us</h3>
            <div className="not-prose mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="h-5 w-5 text-primary-600" />
                info@newvisa.com
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="h-5 w-5 text-primary-600" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-primary-600" />
                Global Offices — Contact for your nearest location
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
