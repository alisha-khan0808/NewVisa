import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';

export const metadata: Metadata = { title: 'Documents — NewVisa Dashboard' };

const documents = [
  { id: 'DOC-001', type: 'Passport', status: 'approved', uploadedAt: '2026-08-15' },
  { id: 'DOC-002', type: 'Photograph', status: 'approved', uploadedAt: '2026-08-15' },
  { id: 'DOC-003', type: 'Education Certificate', status: 'approved', uploadedAt: '2026-08-20' },
  { id: 'DOC-004', type: 'Bank Statement', status: 'under_review', uploadedAt: '2026-08-25' },
  { id: 'DOC-005', type: 'IELTS Results', status: 'uploaded', uploadedAt: '2026-08-28' },
  { id: 'DOC-006', type: 'Employment Letter', status: 'requested', uploadedAt: null },
];

const statusStyles: Record<string, string> = {
  requested: 'bg-gray-100 text-gray-800', uploaded: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800', approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800', re_upload_required: 'bg-red-100 text-red-800',
};

export default function DocumentsPage() {
  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <button className="text-sm text-primary-600 font-medium hover:text-primary-700">+ Upload Document</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[doc.status]}`}>
                      {doc.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.uploadedAt || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
