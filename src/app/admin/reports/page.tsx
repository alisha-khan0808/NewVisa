'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Immigration Reports', desc: 'Leads, applications, approvals, processing times', icon: '📋' },
              { title: 'Travel Reports', desc: 'Flight bookings, hotel bookings, revenue', icon: '✈️' },
              { title: 'Financial Reports', desc: 'Revenue, payments, refunds, outstanding', icon: '💰' },
            ].map((r) => (
              <Card key={r.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">{r.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{r.desc}</p>
                  <Button variant="outline" size="sm">Generate Report</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Date Range Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input type="date" />
                <Input type="date" />
                <Button>Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
