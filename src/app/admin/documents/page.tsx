'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DOCUMENT_STATUS } from '@/lib/constants';

const documents = [
  { id: 'DOC-001', customer: 'Priya Sharma', application: 'APP-001', type: 'Passport', status: 'approved', uploaded: '2026-08-15', reviewed: '2026-08-16' },
  { id: 'DOC-002', customer: 'Priya Sharma', application: 'APP-001', type: 'Education Certificate', status: 'approved', uploaded: '2026-08-15', reviewed: '2026-08-17' },
  { id: 'DOC-003', customer: 'Rajesh Kumar', application: 'APP-002', type: 'Bank Statement', status: 'under_review', uploaded: '2026-08-25', reviewed: null },
  { id: 'DOC-004', customer: 'Sarah Johnson', application: 'APP-003', type: 'IELTS Results', status: 'uploaded', uploaded: '2026-09-01', reviewed: null },
  { id: 'DOC-005', customer: 'Amit Patel', application: 'APP-004', type: 'Employment Letter', status: 'rejected', uploaded: '2026-08-22', reviewed: '2026-08-23' },
];

const statusStyles: Record<string, string> = {
  requested: 'bg-gray-100 text-gray-800', uploaded: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800', approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800', re_upload_required: 'bg-red-100 text-red-800',
};

export default function AdminDocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-500 mb-6">{documents.length} documents</p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input placeholder="Search documents..." />
                <Select placeholder="All Statuses" options={Object.entries(DOCUMENT_STATUS).map(([k, v]) => ({ value: v, label: k.replace(/_/g, ' ') }))} />
                <Input placeholder="Search customers..." />
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviewed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{doc.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{doc.application}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{doc.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[doc.status]}`}>
                            {doc.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{doc.uploaded}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{doc.reviewed || '—'}</td>
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
