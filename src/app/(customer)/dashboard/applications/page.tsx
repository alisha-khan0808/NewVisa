import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Applications — NewVisa Dashboard' };

const applications = [
  { id: 'APP-001', country: 'Canada', type: 'Permanent Residency', status: 'under_review', updated: '2 days ago', counsellor: 'Sarah M.' },
  { id: 'APP-002', country: 'Australia', type: 'Skilled Migration', status: 'documents_pending', updated: '1 week ago', counsellor: 'James K.' },
  { id: 'APP-003', country: 'UK', type: 'Student Visa', status: 'submitted', updated: '3 days ago', counsellor: 'Emma L.' },
];

const statusStyles: Record<string, string> = {
  new: 'bg-gray-100 text-gray-800', contacted: 'bg-gray-100 text-gray-800',
  qualified: 'bg-blue-100 text-blue-800', documents_pending: 'bg-yellow-100 text-yellow-800',
  consultation_scheduled: 'bg-blue-100 text-blue-800', application_in_progress: 'bg-blue-100 text-blue-800',
  submitted: 'bg-blue-100 text-blue-800', under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800', closed: 'bg-gray-100 text-gray-800',
};

export default function ApplicationsPage() {
  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">{app.country} — {app.type}</p>
                  <p className="text-sm text-gray-500 mt-1">Counsellor: {app.counsellor} • Updated {app.updated}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                  {app.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
