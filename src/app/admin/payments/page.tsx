'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const payments = [
  { id: 'PAY-001', customer: 'Priya Sharma', type: 'Consultation', amount: '$150.00', gateway: 'Stripe', status: 'completed', date: '2026-09-01' },
  { id: 'PAY-002', customer: 'Rajesh Kumar', type: 'Application Fee', amount: '$500.00', gateway: 'Stripe', status: 'completed', date: '2026-08-28' },
  { id: 'PAY-003', customer: 'Amit Patel', type: 'Flight Booking', amount: '$2,400.00', gateway: 'Stripe', status: 'completed', date: '2026-09-02' },
  { id: 'PAY-004', customer: 'Lisa Wang', type: 'Hotel Booking', amount: '$750.00', gateway: 'Razorpay', status: 'pending', date: '2026-09-03' },
  { id: 'PAY-005', customer: 'Sarah Johnson', type: 'Consultation', amount: '$100.00', gateway: 'Stripe', status: 'refunded', date: '2026-08-15' },
];

export default function AdminPaymentsPage() {
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Management</h1>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-1">${totalRevenue.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">${pendingAmount.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{payments.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gateway</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{p.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{p.type}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{p.gateway}</td>
                        <td className="px-6 py-4">
                          <Badge variant={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'error'}>
                            {p.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
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
