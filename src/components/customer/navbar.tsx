'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Plane, Hotel, ChevronDown, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase/client';
import type { UserRole } from '@/types';

const visaCategories = [
  { name: 'Student Visa', href: '/countries' },
  { name: 'Work Visa', href: '/countries' },
  { name: 'Visitor Visa', href: '/countries' },
  { name: 'Business Visa', href: '/countries' },
  { name: 'Family Visa', href: '/countries' },
  { name: 'Permanent Residency', href: '/countries' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; role?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          email: session.user.email || undefined,
          role: (session.user.user_metadata as { role?: string } | undefined)?.role,
        });
      }
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || undefined,
          role: (session.user.user_metadata as { role?: string | undefined } | undefined)?.role,
        });
      } else {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };

  const isAdmin = user?.role && user.role !== 'customer';
  const dashboardHref = isAdmin ? '/admin' : '/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-900">
              New<span className="text-accent-500">Visa</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/countries"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              <Globe className="h-4 w-4" />
              Immigration
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50">
                Visa Categories
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px]">
                  {visaCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/flights"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              <Plane className="h-4 w-4" />
              Flights
            </Link>
            <Link
              href="/hotels"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              <Hotel className="h-4 w-4" />
              Hotels
            </Link>
            <Link
              href="/travel"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              Flight + Hotel
            </Link>
            <Link
              href="/faq"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              FAQs
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  {user.email?.split('@')[0]}
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <Link
                        href={dashboardHref}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Separator className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            <Link href="/countries" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Immigration
            </Link>
            <Link href="/flights" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Flights
            </Link>
            <Link href="/hotels" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Hotels
            </Link>
            <Link href="/travel" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Flight + Hotel
            </Link>
            <Link href="/eligibility" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Check Eligibility
            </Link>
            <Link href="/consultation" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              Book Consultation
            </Link>
            <Separator />
            {user ? (
              <>
                <Link href={dashboardHref} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="block px-3 py-2" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
