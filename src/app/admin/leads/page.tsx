'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Users, Search, Filter, UserPlus, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { LEAD_STATUS } from '@/lib/constants';

const leads = [
  { id: 'LEAD-001', name: 'Priya Sharma', email: 'priya@email.com', phone: '+1 234 567 8901', country: 'Canada', visaType: 'PR', status: 'qualified', source: 'Website', counsellor: 'Sarah M.', created: '2026-09-01' },
  { id: 'LEAD-002', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+1 234 567 8902', country: 'Australia', visaType: 'Skilled', status: 'new', source: 'Website', counsellor: 'Unassigned', created: '2026-09-02' },
  { id: 'LEAD-003', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 8903', country: 'UK', visaType: 'Student', status: 'documents_pending', source: 'Referral', counsellor: 'James K.', created: '2026-08-28' },
  { id: 'LEAD-004', name: 'Amit Patel', email: 'amit@email.com', phone: '+1 234 567 8904', country: 'Germany', visaType: 'Work', status: 'contacted', source: 'Website', counsellor: 'Emma L.', created: '2026-08-25' },
  { id: 'LEAD-005', name: 'Lisa Wang', email: 'lisa@email.com', phone: '+1 234 567 8905', country: 'Canada', visaType: 'Study', status: 'consultation_scheduled', source: 'Google', counsellor: 'Sarah M.', created: '2026-08-20' },
];

const statusStyles: Record<string, string> = {
  new: 'bg-gray-100 text-gray-800', contacted: 'bg-blue-100 text-blue-800',
  qualified: 'bg-green-100 text-green-800', documents_pending: 'bg-yellow-100 text-yellow-800',
  consultation_scheduled: 'bg-purple-100 text-purple-800', application_in_progress: 'bg-blue-100 text-blue-800',
  submitted: 'bg-blue-100 text-blue-800', under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800', closed: 'bg-gray-100 text-gray-800',
};

export default function AdminLeadsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-500 mt-1">{leads.length} total leads</p>
            </div>
            <Button><UserPlus className="mr-2 h-4 w-4" /> Add Lead</Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search leads..." className="pl-10" />
                </div>
                <Select placeholder="All Statuses" options={Object.entries(LEAD_STATUS).map(([k, v]) => ({ value: v, label: k.replace(/_/g, ' ') }))} />
                <Select placeholder="All Countries" options={[{ value: '', label: 'All Countries' }, { value: 'canada', label: 'Canada' }, { value: 'australia', label: 'Australia' }]} />
                <Select placeholder="All Counsellors" options={[{ value: '', label: 'All Counsellors' }, { value: 'sarah', label: 'Sarah M.' }, { value: 'james', label: 'James K.' }]} />
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visa Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counsellor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{lead.country}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{lead.visaType}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[lead.status]}`}>
                            {lead.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{lead.counsellor}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.created}</td>
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
