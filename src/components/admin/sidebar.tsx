'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Globe, LayoutDashboard, Users, UserCheck, FileText, Calendar, Plane,
  Hotel, CreditCard, Settings, MessageSquare, LogOut, Menu, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

const menuSections = [
  { title: 'Main', items: [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  ]},
  { title: 'Immigration', items: [
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Counsellors', href: '/admin/counsellors', icon: UserCheck },
    { name: 'Applications', href: '/admin/applications', icon: FileText },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'Consultations', href: '/admin/consultations', icon: Calendar },
  ]},
  { title: 'Travel', items: [
    { name: 'Flight Bookings', href: '/admin/bookings?tab=flights', icon: Plane },
    { name: 'Hotel Bookings', href: '/admin/bookings?tab=hotels', icon: Hotel },
  ]},
  { title: 'Management', items: [
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'CMS', href: '/admin/cms', icon: Settings },
    { name: 'Reports', href: '/admin/reports', icon: MessageSquare },
  ]},
];

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary-600" />
          <span className="font-bold text-primary-900">New<span className="text-accent-500">Visa</span></span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-gray-700">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary-950 text-white
        transform transition-transform duration-200 ease-in-out overflow-y-auto
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <Link href="/admin" className="hidden lg:flex items-center gap-2 mb-8">
            <Globe className="h-7 w-7 text-accent-400" />
            <span className="text-lg font-bold text-white">New<span className="text-accent-400">Visa</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 mb-8 px-3">
            <Avatar fallback="SA" size="md" />
            <div>
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-gray-400">admin@newvisa.com</p>
            </div>
          </div>

          <nav className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-primary-900 hover:text-white transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-primary-800">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary-900" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
