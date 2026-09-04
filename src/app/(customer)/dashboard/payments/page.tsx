import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';

export const metadata: Metadata = { title: 'Payments — NewVisa Dashboard' };

const payments = [
  { id: 'PAY-001', date: '2026-09-01', amount: '$150.00', type: 'Consultation', status: 'completed' },
  { id: 'PAY-002', date: '2026-08-28', amount: '$500.00', type: 'Application Fee', status: 'completed' },
  { id: 'PAY-003', date: '2026-09-03', amount: '$1,200.00', type: 'Flight Booking', status: 'pending' },
];

export default function PaymentsPage() {
  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h1>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
