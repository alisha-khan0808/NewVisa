'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';

const flightBookings = [
  { id: 'FLT-001', customer: 'Priya Sharma', route: 'DEL → YYZ', date: '2026-10-15', passengers: 2, total: '$2,400', status: 'confirmed' },
  { id: 'FLT-002', customer: 'Rajesh Kumar', route: 'BOM → SYD', date: '2026-11-01', passengers: 1, total: '$1,800', status: 'confirmed' },
];

const hotelBookings = [
  { id: 'HTL-001', customer: 'Priya Sharma', hotel: 'Toronto Grand Hotel', checkIn: '2026-10-15', nights: 7, rooms: 1, total: '$1,050', status: 'confirmed' },
  { id: 'HTL-002', customer: 'Sarah Johnson', hotel: 'London Central Inn', checkIn: '2026-09-20', nights: 5, rooms: 1, total: '$750', status: 'confirmed' },
];

export default function AdminBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Travel Bookings</h1>

          <Tabs defaultValue="flights">
            <Tabs.List>
              <Tabs.Trigger value="flights">Flight Bookings ({flightBookings.length})</Tabs.Trigger>
              <Tabs.Trigger value="hotels">Hotel Bookings ({hotelBookings.length})</Tabs.Trigger>
            </Tabs.List>

            <TabsContent value="flights">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passengers</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {flightBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{b.customer}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.route}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.passengers}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.total}</td>
                            <td className="px-6 py-4"><Badge variant="success">{b.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hotels">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nights</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {hotelBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{b.customer}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.hotel}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.checkIn}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{b.nights}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.total}</td>
                            <td className="px-6 py-4"><Badge variant="success">{b.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
