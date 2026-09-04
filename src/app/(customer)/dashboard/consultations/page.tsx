import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';

export const metadata: Metadata = { title: 'Consultations — NewVisa Dashboard' };

const consultations = [
  { id: 'CON-001', date: '2026-09-10', time: '10:00 AM', type: 'video', status: 'scheduled', counsellor: 'Sarah M.' },
  { id: 'CON-002', date: '2026-08-25', time: '2:00 PM', type: 'phone', status: 'completed', counsellor: 'James K.' },
];

const typeLabels: Record<string, string> = { video: 'Video Call', phone: 'Phone Call', office: 'Office Visit' };

export default function ConsultationsPage() {
  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Consultations</h1>
          <a href="/consultation" className="text-sm text-primary-600 font-medium hover:text-primary-700">Book New Consultation</a>
        </div>
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{c.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">{c.date} at {c.time} • {typeLabels[c.type]}</p>
                  <p className="text-sm text-gray-500">Counsellor: {c.counsellor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
