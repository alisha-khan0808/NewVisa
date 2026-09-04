'use client';

import Link from 'next/link';
import { CheckCircle, Users, Globe, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { label: 'Countries', value: '50+', icon: Globe },
  { label: 'Happy Clients', value: '10K+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: CheckCircle },
  { label: 'Years Experience', value: '15+', icon: Shield },
];

const features = [
  {
    title: 'Visa & Immigration',
    description: 'Expert guidance for visa applications, immigration processes, and permanent residency pathways.',
    icon: Globe,
    href: '/countries',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Flight Booking',
    description: 'Search and book flights worldwide with the best prices and flexible options.',
    icon: ArrowRight,
    href: '/flights',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Hotel Booking',
    description: 'Find and book accommodations globally with competitive rates.',
    icon: Sparkles,
    href: '/hotels',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'AI Assistant',
    description: 'Get instant answers to your immigration and travel questions with our AI-powered chatbot.',
    icon: Shield,
    href: '#chatbot',
    color: 'bg-amber-50 text-amber-600',
  },
];

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-accent-300 mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Immigration & Travel Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Your Journey Abroad{' '}
            <span className="text-accent-400">Starts Here</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
            From visa applications to flight bookings — discover, plan, and manage your entire international journey in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eligibility">
              <Button size="lg" variant="accent" className="w-full sm:w-auto">
                Check Eligibility
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-accent-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
