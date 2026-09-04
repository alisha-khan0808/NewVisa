'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, FileText, Calendar, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dashboardLinks = [
  { name: 'Overview', href: '/dashboard', icon: Globe },
  { name: 'Applications', href: '/dashboard/applications', icon: FileText },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Consultations', href: '/dashboard/consultations', icon: Calendar },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CreditCard },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: ArrowLeft },
];

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile toggle */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-bold text-primary-900 text-lg">NewVisa</Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-700">☰ Menu</button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <Link href="/" className="hidden lg:flex items-center gap-2 mb-8">
              <Globe className="h-7 w-7 text-primary-600" />
              <span className="text-lg font-bold text-primary-900">New<span className="text-accent-500">Visa</span></span>
            </Link>

            <nav className="space-y-1">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Website
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
