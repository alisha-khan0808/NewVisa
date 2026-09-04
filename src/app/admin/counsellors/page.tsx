'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const counsellors = [
  { id: 'CNS-001', name: 'Sarah Mitchell', email: 'sarah@newvisa.com', phone: '+1 234 567 8901', specialization: ['Canada', 'PR'], activeLeads: 24, performance: '92%' },
  { id: 'CNS-002', name: 'James Kim', email: 'james@newvisa.com', phone: '+1 234 567 8902', specialization: ['Australia', 'Skilled Migration'], activeLeads: 18, performance: '88%' },
  { id: 'CNS-003', name: 'Emma Lewis', email: 'emma@newvisa.com', phone: '+1 234 567 8903', specialization: ['UK', 'Student Visa', 'Work Visa'], activeLeads: 31, performance: '95%' },
];

export default function AdminCounsellorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Counsellor Management</h1>
              <p className="text-gray-500 mt-1">{counsellors.length} counsellors</p>
            </div>
            <Button>Add Counsellor</Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Search counsellors..." />
                <Select placeholder="All Countries" options={[{ value: '', label: 'All Countries' }, { value: 'canada', label: 'Canada' }, { value: 'australia', label: 'Australia' }]} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counsellors.map((c) => (
              <Card key={c.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{c.name}</h3>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Specialization</span>
                      <span className="text-gray-900">{c.specialization.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Leads</span>
                      <span className="text-gray-900">{c.activeLeads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Performance</span>
                      <span className="text-green-600 font-medium">{c.performance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
