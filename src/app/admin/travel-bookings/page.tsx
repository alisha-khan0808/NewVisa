'use client';

import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Plane, Hotel, Package, X } from 'lucide-react';

interface TravelBooking {
  id: string;
  booking_id: string;
  flight_booking_id: string | null;
  hotel_booking_id: string | null;
  customer_id: string | null;
  total: number;
  currency: string;
  status: string;
  created_at: string;
}

interface BookingDetail {
  booking_id: string;
  from_airport: string;
  to_airport: string;
  departure_date: string;
  return_date: string | null;
  passengers: number;
  cabin_class: string;
  total: number;
  hotel_name: string;
  check_in: string;
  check_out: string;
  rooms: number;
}

export default function AdminTravelBookingsPage() {
  const [bookings, setBookings] = useState<TravelBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BookingDetail | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    async function fetchTravelBookings() {
      try {
        const res = await fetch('/api/admin/bookings?type=travel');
        const json = await res.json();
        if (json.success) {
          setBookings(json.data || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchTravelBookings();
  }, []);

  const viewDetails = async (booking: TravelBooking) => {
    // Fetch flight and hotel details
    let detail: BookingDetail = {
      booking_id: booking.booking_id,
      from_airport: '',
      to_airport: '',
      departure_date: '',
      return_date: null,
      passengers: 0,
      cabin_class: '',
      total: booking.total,
      hotel_name: '',
      check_in: '',
      check_out: '',
      rooms: 0,
    };

    if (booking.flight_booking_id) {
      try {
        const res = await fetch(`/api/admin/bookings?type=flight`);
        const json = await res.json();
        const flight = (json.data || []).find((f: { booking_id: string }) => f.booking_id === booking.flight_booking_id);
        if (flight) {
          detail.from_airport = flight.from_airport;
          detail.to_airport = flight.to_airport;
          detail.departure_date = flight.departure_date;
          detail.return_date = flight.return_date;
          detail.passengers = flight.passengers;
          detail.cabin_class = flight.cabin_class;
        }
      } catch {
        // ignore
      }
    }

    if (booking.hotel_booking_id) {
      try {
        const res = await fetch(`/api/admin/bookings?type=hotel`);
        const json = await res.json();
        const hotel = (json.data || []).find((h: { booking_id: string }) => h.booking_id === booking.hotel_booking_id);
        if (hotel) {
          detail.hotel_name = hotel.hotel_name;
          detail.check_in = hotel.check_in;
          detail.check_out = hotel.check_out;
          detail.rooms = hotel.rooms;
        }
      } catch {
        // ignore
      }
    }

    setSelected(detail);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Travel Bookings</h1>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>)}
            </div>
          ) : bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No travel packages booked yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Travel ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.booking_id}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{b.flight_booking_id || '—'}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{b.hotel_booking_id || '—'}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: b.currency }).format(b.total)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={b.status === 'confirmed' ? 'success' : 'secondary'}>{b.status}</Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(b.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detail Modal */}
          {showDetail && selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <Card className="w-full max-w-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Travel Package Details</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowDetail(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selected.from_airport && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Plane className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">Flight</h4>
                        </div>
                        <p className="text-sm text-gray-700">{selected.from_airport} → {selected.to_airport}</p>
                        <p className="text-sm text-gray-600">{selected.departure_date}{selected.return_date ? ` to ${selected.return_date}` : ''}</p>
                        <p className="text-sm text-gray-600">{selected.passengers} Passenger(s) | {selected.cabin_class}</p>
                      </div>
                    )}
                    {selected.hotel_name && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Hotel className="h-5 w-5 text-purple-600" />
                          <h4 className="font-medium">Hotel</h4>
                        </div>
                        <p className="text-sm text-gray-700">{selected.hotel_name}</p>
                        <p className="text-sm text-gray-600">{selected.check_in} to {selected.check_out}</p>
                        <p className="text-sm text-gray-600">{selected.rooms} Room(s)</p>
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-xl font-bold">Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selected.total)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
