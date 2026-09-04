'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, ArrowRight, Calendar, Users, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Flight Booking — Search & Book Flights Worldwide | NewVisa',
  description: 'Search and book flights worldwide with competitive fares. One-way, round-trip, and multi-city options available.',
};

interface FlightResult {
  id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  from_airport: string;
  to_airport: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  price: number;
  price_per_adult: number;
  price_per_child: number;
  available_seats: number;
  trip_type: string;
  status: string;
}

export default function FlightsPage() {
  const [tab, setTab] = useState('round_trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [cabin, setCabin] = useState('economy');
  const [results, setResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [booking, setBooking] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
  const [travellerName, setTravellerName] = useState('');
  const [travellerEmail, setTravellerEmail] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !departure) return;
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ from, to, date: departure, passengers: adults, tripType: tab, ...(tab !== 'one_way' && returnDate ? { returnDate } : {}) });
      const res = await fetch(`/api/flights?${params}`);
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
    if (!selectedFlight) return;
    setBooking(selectedFlight.id);
    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: selectedFlight.from_airport,
          to: selectedFlight.to_airport,
          departure_date: departure,
          return_date: tab !== 'one_way' ? returnDate : null,
          departure_time: selectedFlight.departure_time,
          arrival_time: selectedFlight.arrival_time,
          airline: selectedFlight.airline,
          flight_number: selectedFlight.flight_number,
          passengers: parseInt(adults),
          cabin_class: cabin,
          fare: selectedFlight.price,
          trip_type: tab,
        }),
      });
      if (res.ok) {
        setBookingComplete(true);
      }
    } catch {
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(null);
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Plane className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Flight Booking</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Search and book flights to destinations worldwide with the best prices.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="-mt-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <Tabs value={tab} onValueChange={setTab}>
                <Tabs.List>
                  <Tabs.Trigger value="round_trip">Round Trip</Tabs.Trigger>
                  <Tabs.Trigger value="one_way">One Way</Tabs.Trigger>
                  <Tabs.Trigger value="multi_city">Multi City</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value={tab}>
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Departure city" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destination city" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                      <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className="input-field" required />
                    </div>
                    {tab !== 'one_way' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
                        <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="input-field" />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                      <select value={adults} onChange={(e) => setAdults(e.target.value)} className="input-field">
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                      <select value={children} onChange={(e) => setChildren(e.target.value)} className="input-field">
                        {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
                      <select value={cabin} onChange={(e) => setCabin(e.target.value)} className="input-field">
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full" variant="accent" disabled={loading}>
                        <Search className="mr-2 h-4 w-4" />
                        {loading ? 'Searching...' : 'Search Flights'}
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
              {results.length > 0 ? `${results.length} Flight${results.length !== 1 ? 's' : ''} Found` : 'No Flights Found'}
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i}><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((flight) => (
                  <Card key={flight.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="font-semibold text-lg">{flight.airline}</span>
                            <span className="text-sm text-gray-500">{flight.flight_number}</span>
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{flight.cabin_class || cabin}</span>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-lg">{formatTime(flight.departure_time)}</div>
                              <div className="text-gray-500">{flight.from_airport}</div>
                              <div className="text-xs text-gray-400">{formatDate(flight.departure_time)}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <div className="text-xs text-gray-400 mb-1">{flight.duration}</div>
                              <div className="w-full h-px bg-gray-300 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400" />
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-lg">{formatTime(flight.arrival_time)}</div>
                              <div className="text-gray-500">{flight.to_airport}</div>
                              <div className="text-xs text-gray-400">{formatDate(flight.arrival_time)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right lg:min-w-[160px]">
                          <div className="text-sm text-gray-500 line-through">${(flight.price * 1.25).toFixed(2)}</div>
                          <div className="text-2xl font-bold text-gray-900">${flight.price.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">per adult</div>
                          <Button className="mt-2 w-full" variant="accent" onClick={() => setSelectedFlight(flight)}>
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
                  <Plane className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No flights found for this route. Try different dates or a nearby airport.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {selectedFlight && !bookingComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Complete Booking</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedFlight(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{selectedFlight.airline}</span>
                  <span className="text-sm text-gray-500">{selectedFlight.flight_number}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedFlight.from_airport} → {selectedFlight.to_airport}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(selectedFlight.departure_time)} at {formatTime(selectedFlight.departure_time)}
                </div>
                <div className="mt-2 text-right font-semibold">
                  ${selectedFlight.price.toFixed(2)} + ${(selectedFlight.price * 0.15).toFixed(2)} (15% markup) = ${(selectedFlight.price * 1.15).toFixed(2)}
                </div>
              </div>
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={travellerName} onChange={(e) => setTravellerName(e.target.value)} className="input-field" required placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} className="input-field" required placeholder="john@example.com" />
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
                <Plane className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your flight has been booked successfully. A confirmation email will be sent shortly.</p>
              <Button onClick={() => { setBookingComplete(false); setSelectedFlight(null); setResults([]); setSearched(false); }} className="w-full">
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Booking with NewVisa</h2>
          <p className="text-gray-600 mb-8">
            Our flight booking integration connects you with top travel suppliers for the best fares. Support for one-way, round-trip, and multi-city bookings with live availability and instant confirmation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: 'Flexible Dates', desc: 'Find the best fares across dates' },
              { icon: Users, title: 'Group Booking', desc: 'Book for multiple passengers' },
              { icon: Plane, title: 'Multi-City', desc: 'Plan complex itineraries' },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <f.icon className="h-6 w-6 text-blue-600" />
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
