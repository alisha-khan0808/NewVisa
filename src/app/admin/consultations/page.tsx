'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CONSULTATION_TYPE } from '@/lib/constants';

const consultations = [
  { id: 'CON-001', customer: 'Priya Sharma', email: 'priya@email.com', phone: '+1 234 567 8901', country: 'Canada', visaType: 'PR', type: 'video', date: '2026-09-10', time: '10:00 AM', counsellor: 'Sarah M.', status: 'scheduled' },
  { id: 'CON-002', customer: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 8903', country: 'UK', visaType: 'Student', type: 'phone', date: '2026-09-12', time: '2:00 PM', counsellor: 'James K.', status: 'scheduled' },
  { id: 'CON-003', customer: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+1 234 567 8902', country: 'Australia', visaType: 'Skilled', type: 'office', date: '2026-08-25', time: '11:00 AM', counsellor: 'Emma L.', status: 'completed' },
];

const typeLabels: Record<string, string> = { phone_call: 'Phone Call', video: 'Video', office: 'Office Visit' };

export default function AdminConsultationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Consultation Management</h1>
              <p className="text-gray-500 mt-1">{consultations.length} consultations</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input placeholder="Search consultations..." />
                <Select placeholder="All Statuses" options={[{ value: '', label: 'All Statuses' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }]} />
                <Select placeholder="All Counsellors" options={[{ value: '', label: 'All Counsellors' }, { value: 'sarah', label: 'Sarah M.' }, { value: 'james', label: 'James K.' }]} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counsellor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {consultations.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{c.customer}</p>
                            <p className="text-xs text-gray-500">{c.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{typeLabels[c.type]}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{c.date} at {c.time}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{c.counsellor}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${c.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : c.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
