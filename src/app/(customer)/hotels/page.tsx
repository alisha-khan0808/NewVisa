'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hotel, ArrowRight, Calendar, Users, Search, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface HotelResult {
  id: string;
  booking_id: string;
  hotel_id: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  rooms: number;
  adults: number;
  children: number;
  room_details: Record<string, unknown>;
  rate: number;
  markup: number;
  total: number;
  currency: string;
  status: string;
}

export default function HotelsPage() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState('1');
  const [results, setResults] = useState<HotelResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ destination, checkIn, checkOut, rooms });
      const res = await fetch(`/api/hotels?${params}`);
      const json = await res.json();
      if (json.success) {
        setResults(json.data || []);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;
    setBooking(true);
    try {
      const res = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_id: selectedHotel.hotel_id,
          hotel_name: selectedHotel.hotel_name,
          check_in: selectedHotel.check_in,
          check_out: selectedHotel.check_out,
          rooms: parseInt(rooms),
          adults: 2,
          children: 0,
          rate: selectedHotel.rate,
        }),
      });
      if (res.ok) {
        setBookingComplete(true);
      }
    } catch {
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Hotel className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Hotel Booking</h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Find and book accommodations with the best rates worldwide.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="-mt-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="hotel">
                <Tabs.List>
                  <Tabs.Trigger value="hotel">Hotels</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="hotel">
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                      <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="City or hotel name" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                      <select value={rooms} onChange={(e) => setRooms(e.target.value)} className="input-field">
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div className="lg:col-span-4 flex justify-end">
                      <Button type="submit" className="w-full lg:w-auto" variant="accent" disabled={loading}>
                        <Search className="mr-2 h-4 w-4" />
                        {loading ? 'Searching...' : 'Search Hotels'}
                      </Button>
                    </div>
                  </form>
                </Tabs.Content>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results */}
      {searched && (
        <section className="py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {results.length > 0 ? `${results.length} Property${results.length !== 1 ? 'ies' : ''} Found` : 'No Properties Found'}
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i}><CardContent className="p-6"><Skeleton className="h-32 w-full" /></CardContent></Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((hotel) => (
                  <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{hotel.hotel_name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium">4.0</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Check-in: {hotel.check_in} | Check-out: {hotel.check_out}</p>
                            <p>{hotel.rooms} Room{hotel.rooms > 1 ? 's' : ''} | {hotel.adults} Adult{hotel.adults > 1 ? 's' : ''}{hotel.children > 0 ? ` | ${hotel.children} Child${hotel.children > 1 ? 'ren' : ''}` : ''}</p>
                            <p className="text-xs text-gray-400">Booking ID: {hotel.booking_id}</p>
                          </div>
                        </div>
                        <div className="text-right lg:min-w-[140px]">
                          <div className="text-sm text-gray-500 line-through">${(hotel.total * 1.25).toFixed(2)}</div>
                          <div className="text-2xl font-bold text-gray-900">${hotel.total.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">total</div>
                          <Button className="mt-2 w-full" variant="accent" onClick={() => setSelectedHotel(hotel)}>
                            Select
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Hotel className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No hotels found for this destination. Try a different city.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {selectedHotel && !bookingComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Complete Booking</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedHotel(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{selectedHotel.hotel_name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">4.0</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedHotel.check_in} to {selectedHotel.check_out} | {rooms} Room{rooms > 1 ? 's' : ''}
                </div>
                <div className="mt-2 text-right font-semibold">
                  ${selectedHotel.total.toFixed(2)} + ${selectedHotel.markup.toFixed(2)} (15% markup) = ${(selectedHotel.total + selectedHotel.markup).toFixed(2)}
                </div>
              </div>
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="input-field" required placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="input-field" required placeholder="john@example.com" />
                </div>
                <Button type="submit" className="w-full" disabled={!!booking}>
                  {booking ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Success */}
      {bookingComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Hotel className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your hotel has been booked successfully. A confirmation email will be sent shortly.</p>
              <Button onClick={() => { setBookingComplete(false); setSelectedHotel(null); setResults([]); setSearched(false); }} className="w-full">
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Booking with NewVisa</h2>
          <p className="text-gray-600 mb-8">
            Access live hotel inventory from top suppliers worldwide. Filter by star rating, amenities, price range, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: 'Flexible Dates', desc: 'Compare rates across dates' },
              { icon: Users, title: 'Group Stays', desc: 'Multiple rooms and guests' },
              { icon: Hotel, title: 'Best Rates', desc: 'Competitive pricing guaranteed' },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <f.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
