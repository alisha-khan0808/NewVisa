'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Globe, Plane, Hotel, ArrowRight, Star, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COUNTRY_SLUGS, VISA_CATEGORIES } from '@/lib/constants';
import { Hero } from '@/components/customer/hero';
import { CountryCard } from '@/components/customer/country-card';
import { VisaCard } from '@/components/customer/country-card';
import { Navbar } from '@/components/customer/navbar';
import { Footer } from '@/components/customer/footer';
import { Chatbot } from '@/components/customer/chatbot';

const featuredCountries = [
  { name: 'Canada', slug: 'canada', description: 'Express Entry, Provincial Nominee Programs, and Study Permits for skilled professionals.', imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92be?w=600&h=400&fit=crop', featured: true },
  { name: 'Australia', slug: 'australia', description: 'Skilled Migration, Employer-Sponsored Visas, and Regional Opportunities.', imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&h=400&fit=crop', featured: true },
  { name: 'United Kingdom', slug: 'uk', description: 'Skilled Worker Visa, Student Visa, and Innovator Visa pathways.', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop', featured: true },
  { name: 'United States', slug: 'usa', description: 'H-1B, L-1, O-1 Visas, Green Card options, and EB-5 Investor Visa.', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop' },
  { name: 'Germany', slug: 'germany', description: 'EU Blue Card, Job Seeker Visa, and Skilled Immigration Act.', imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop' },
  { name: 'New Zealand', slug: 'new-zealand', description: 'Skilled Migrant Category, Work to Residence, and Study pathways.', imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop' },
];

const testimonials = [
  { name: 'Priya Sharma', text: 'NewVisa made my Canada PR journey seamless. The eligibility check was spot-on!', rating: 5 },
  { name: 'Rajesh Kumar', text: 'Got my Australia visa approved in record time. Highly recommend their consultation service.', rating: 5 },
  { name: 'Sarah Johnson', text: 'The flight + hotel booking was smooth and the AI assistant answered all my questions.', rating: 5 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="animate-fade-in">
      <Hero />

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, label: '98% Success Rate', sub: 'Application approvals' },
              { icon: Users, label: '10,000+ Clients', sub: 'Served globally' },
              { icon: Globe, label: '50+ Countries', sub: 'Immigration services' },
              { icon: Star, label: '4.8/5 Rating', sub: 'Customer satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Immigration Destinations
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore visa and immigration options for the world&#39;s most sought-after destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCountries.map((country) => (
              <CountryCard key={country.name} {...country} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/countries">
              <Button variant="outline" size="lg">
                View All Countries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Visa Categories</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              Find the right visa category for your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISA_CATEGORIES.slice(0, 6).map((cat) => (
              <VisaCard key={cat.id} title={cat.name} description={cat.description} href="/countries" />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Travel Made Easy</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              Book flights and hotels worldwide — once your visa is approved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/flights">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Plane className="h-12 w-12 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Flight Booking</h3>
                <p className="text-blue-100 mb-4">Search and book flights to your destination with real-time availability.</p>
                <span className="inline-flex items-center text-sm font-medium text-white">
                  Search Flights <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
            <Link href="/hotels">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-8 text-white hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Hotel className="h-12 w-12 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Hotel Booking</h3>
                <p className="text-purple-100 mb-4">Find and book accommodations with the best rates worldwide.</p>
                <span className="inline-flex items-center text-sm font-medium text-white">
                  Search Hotels <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
            Take our free eligibility assessment and get personalized recommendations for your immigration goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eligibility">
              <Button size="lg" variant="accent">
                Check Eligibility Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}
