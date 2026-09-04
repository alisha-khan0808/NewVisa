'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, FileText, Calendar, Plane, Hotel, CreditCard,
  TrendingUp, Clock, CheckCircle, AlertCircle, Globe,
  BarChart3, ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase/client';

type StatCard = {
  label: string;
  value: number | string;
  icon: typeof Users;
  href: string;
  trend?: string;
  color: string;
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivity, setRecentActivity] = useState<{ action: string; resource: string; time: string }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, appsRes, docsRes, consultationsRes, bookingsRes, paymentsRes] = await Promise.all([
          supabase.from('leads').select('id, status, created_at', { count: 'exact', head: false }),
          supabase.from('applications').select('id, status, created_at', { count: 'exact', head: false }),
          supabase.from('documents').select('id, status', { count: 'exact', head: false }),
          supabase.from('consultations').select('id, status, created_at', { count: 'exact', head: false }),
          supabase.from('travel_bookings').select('id, status, created_at', { count: 'exact', head: false }),
          supabase.from('payments').select('id, status, amount, created_at', { count: 'exact', head: false }),
        ]);

        const leadCount = leadsRes.count || 0;
        const newLeads = leadsRes.data?.filter(l => l.status === 'new').length || 0;
        const activeApps = appsRes.data?.filter(a => !['approved', 'rejected', 'closed'].includes(a.status)).length || 0;
        const pendingDocs = docsRes.data?.filter(d => d.status === 'uploaded' || d.status === 'under_review').length || 0;
        const upcomingConsultations = consultationsRes.data?.filter(c => c.status === 'scheduled').length || 0;
        const activeBookings = bookingsRes.data?.filter(b => b.status === 'confirmed' || b.status === 'pending').length || 0;
        const totalRevenue = paymentsRes.data?.filter(p => p.status === 'completed').reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

        setStats([
          { label: 'Total Leads', value: leadCount, icon: Users, href: '/admin/leads', trend: `${newLeads} new`, color: 'bg-blue-50 text-blue-600' },
          { label: 'Active Applications', value: activeApps, icon: FileText, href: '/admin/applications', trend: `${appsRes.count} total`, color: 'bg-green-50 text-green-600' },
          { label: 'Pending Documents', value: pendingDocs, icon: AlertCircle, href: '/admin/documents', trend: 'Needs review', color: 'bg-amber-50 text-amber-600' },
          { label: 'Consultations', value: upcomingConsultations, icon: Calendar, href: '/admin/consultations', trend: 'Upcoming', color: 'bg-purple-50 text-purple-600' },
          { label: 'Travel Bookings', value: activeBookings, icon: Plane, href: '/admin/bookings', trend: 'Active', color: 'bg-cyan-50 text-cyan-600' },
          { label: 'Revenue', value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: TrendingUp, href: '/admin/reports', trend: 'Total', color: 'bg-emerald-50 text-emerald-600' },
        ]);

        // Build recent activity from data
        const activities: { action: string; resource: string; time: string }[] = [];
        leadsRes.data?.slice(0, 3).forEach(l => {
          activities.push({ action: 'New lead created', resource: l.lead_id || l.id, time: l.created_at });
        });
        appsRes.data?.slice(0, 3).forEach(a => {
          activities.push({ action: 'Application updated', resource: a.id, time: a.created_at });
        });
        activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setRecentActivity(activities.slice(0, 10));
      } catch {
        // Fallback to default stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your NewVisa platform operations.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-16 bg-gray-100 rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}>
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                      </div>
                      {stat.trend && (
                        <span className="text-xs text-gray-400 whitespace-nowrap">{stat.trend}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Content Tabs */}
        <Tabs value="overview" onValueChange={() => {}}>
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
          </Tabs.List>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'New Lead', href: '/admin/leads', icon: Users },
                      { label: 'Applications', href: '/admin/applications', icon: FileText },
                      { label: 'Documents', href: '/admin/documents', icon: FileText },
                      { label: 'Consultations', href: '/admin/consultations', icon: Calendar },
                      { label: 'Bookings', href: '/admin/bookings', icon: Plane },
                      { label: 'Payments', href: '/admin/payments', icon: CreditCard },
                      { label: 'CMS Pages', href: '/admin/cms', icon: Globe },
                      { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
                    ].map((action) => (
                      <Link key={action.label} href={action.href}>
                        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <action.icon className="h-5 w-5 text-primary-600 mb-1" />
                          <p className="text-sm font-medium text-gray-700">{action.label}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentActivity.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
                  ) : (
                    <div className="space-y-3">
                      {recentActivity.slice(0, 8).map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.resource}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(activity.time).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { source: 'Website', count: 45, pct: 60 },
                      { source: 'Referral', count: 20, pct: 27 },
                      { source: 'Social Media', count: 7, pct: 9 },
                      { source: 'Other', count: 3, pct: 4 },
                    ].map((item) => (
                      <div key={item.source} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.source}</span>
                            <span className="text-xs text-gray-500">{item.count} leads ({item.pct}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { status: 'Under Review', count: 12, color: 'bg-yellow-500' },
                      { status: 'Submitted', count: 8, color: 'bg-blue-500' },
                      { status: 'Documents Verified', count: 5, color: 'bg-green-500' },
                      { status: 'Draft', count: 3, color: 'bg-gray-400' },
                    ].map((item) => (
                      <div key={item.status} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.status}</span>
                            <span className="text-xs text-gray-500">{item.count}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / 28) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
