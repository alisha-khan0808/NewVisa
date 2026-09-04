'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Plane, Hotel, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FlightBooking {
  id: string;
  booking_id: string;
  from_airport: string;
  to_airport: string;
  departure_date: string;
  return_date: string | null;
  passengers: number;
  total: number;
  currency: string;
  status: string;
  created_at: string;
}

interface HotelBooking {
  id: string;
  booking_id: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  rooms: number;
  total: number;
  currency: string;
  status: string;
  created_at: string;
}

export default function BookingsPage() {
  const [flights, setFlights] = useState<FlightBooking[]>([]);
  const [hotels, setHotels] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('flights');

  useEffect(() => {
    async function fetchBookings() {
      try {
        const [flightsRes, hotelsRes] = await Promise.all([
          fetch('/api/admin/bookings?type=flight'),
          fetch('/api/admin/bookings?type=hotel'),
        ]);
        const flightsJson = await flightsRes.json();
        const hotelsJson = await hotelsRes.json();
        if (flightsJson.success) setFlights(flightsJson.data || []);
        if (hotelsJson.success) setHotels(hotelsJson.data || []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
        <Tabs value={tab} onValueChange={setTab}>
          <Tabs.List>
            <Tabs.Trigger value="flights">Flight Bookings ({flights.length})</Tabs.Trigger>
            <Tabs.Trigger value="hotels">Hotel Bookings ({hotels.length})</Tabs.Trigger>
          </Tabs.List>

          <TabsContent value="flights">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>)}
              </div>
            ) : flights.length === 0 ? (
              <EmptyState icon={Plane} title="No Flight Bookings" description="Your flight bookings will appear here." />
            ) : (
              <div className="space-y-4">
                {flights.map((b) => (
                  <Card key={b.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Plane className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{b.booking_id}</h3>
                            <p className="text-sm text-gray-600">{b.from_airport} → {b.to_airport}</p>
                            <p className="text-xs text-gray-400">
                              {b.departure_date}{b.return_date ? ` → ${b.return_date}` : ''} | {b.passengers} Passenger{b.passengers > 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Booked on {new Date(b.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(b.total, b.currency)}</p>
                          <Badge variant={b.status === 'confirmed' ? 'success' : 'secondary'}>{b.status}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotels">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>)}
              </div>
            ) : hotels.length === 0 ? (
              <EmptyState icon={Hotel} title="No Hotel Bookings" description="Your hotel bookings will appear here." />
            ) : (
              <div className="space-y-4">
                {hotels.map((b) => (
                  <Card key={b.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <Hotel className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{b.hotel_name}</h3>
                            <p className="text-sm text-gray-600">Booking ID: {b.booking_id}</p>
                            <p className="text-xs text-gray-400">
                              {b.check_in} to {b.check_out} | {b.rooms} Room{b.rooms > 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Booked on {new Date(b.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(b.total, b.currency)}</p>
                          <Badge variant={b.status === 'confirmed' ? 'success' : 'secondary'}>{b.status}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CustomerDashboardLayout>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Icon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="font-medium text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
