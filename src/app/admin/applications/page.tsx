'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { APPLICATION_STATUS } from '@/lib/constants';

const applications = [
  { id: 'APP-001', customer: 'Priya Sharma', country: 'Canada', type: 'Permanent Residency', status: 'under_review', counsellor: 'Sarah M.', submitted: '2026-08-15' },
  { id: 'APP-002', customer: 'Rajesh Kumar', country: 'Australia', type: 'Skilled Migration', status: 'documents_verified', counsellor: 'James K.', submitted: '2026-08-20' },
  { id: 'APP-003', customer: 'Sarah Johnson', country: 'UK', type: 'Student Visa', status: 'submitted', counsellor: 'Emma L.', submitted: '2026-09-01' },
  { id: 'APP-004', customer: 'Amit Patel', country: 'Germany', type: 'Work Visa', status: 'prepared', counsellor: 'Emma L.', submitted: null },
];

const statusStyles: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800', documents_requested: 'bg-yellow-100 text-yellow-800',
  documents_submitted: 'bg-blue-100 text-blue-800', documents_verified: 'bg-green-100 text-green-800',
  prepared: 'bg-blue-100 text-blue-800', submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800', approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800', closed: 'bg-gray-100 text-gray-800',
};

export default function AdminApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Application Management</h1>
              <p className="text-gray-500 mt-1">{applications.length} total applications</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <Input placeholder="Search applications..." />
                </div>
                <Select placeholder="All Statuses" options={Object.entries(APPLICATION_STATUS).map(([k, v]) => ({ value: v, label: k.replace(/_/g, ' ') }))} />
                <Select placeholder="All Counsellors" options={[{ value: '', label: 'All Counsellors' }]} />
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counsellor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{app.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{app.country}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{app.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                            {app.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{app.counsellor}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{app.submitted || '—'}</td>
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
