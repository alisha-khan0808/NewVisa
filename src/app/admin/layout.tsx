'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      const role = (session.user.user_metadata as { role?: string } | undefined)?.role;
      if (role === 'customer' || !role) {
        // Non-admin users shouldn't access admin
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session || pathname === '/admin/login') return;
      const role = (session.user.user_metadata as { role?: string } | undefined)?.role;
      setAuthenticated(!!(role && role !== 'customer'));
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!authenticated && pathname !== '/admin/login') {
    router.replace('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
