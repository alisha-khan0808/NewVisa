'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Hotel, ArrowRight, CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Flight + Hotel Packages — Combined Travel Booking | NewVisa',
  description: 'Book flight + hotel packages and save. Combined travel bookings with a single Travel Booking ID.',
};

export default function TravelPage() {
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [showHotelSearch, setShowHotelSearch] = useState(false);
  const [bookings, setBookings] = useState<{ flight?: unknown; hotel?: unknown }>({});
  const [bundleComplete, setBundleComplete] = useState(false);

  const handleBundle = () => {
    if (bookings.flight && bookings.hotel) {
      setBundleComplete(true);
    } else {
      alert('Please select both a flight and a hotel to create a travel package.');
    }
  };

  if (bundleComplete) {
    return (
      <div className="animate-fade-in min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Travel Package Confirmed!</h3>
            <p className="text-gray-600 mb-4">Your flight + hotel bundle has been created successfully. A Travel Booking ID has been generated for your reference.</p>
            <Button onClick={() => { setBundleComplete(false); setBookings({}); }} className="w-full">
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Package className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Flight + Hotel Packages</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Combine your flight and hotel bookings into one seamless travel experience and save with our bundled packages.
          </p>
        </div>
      </section>

      {/* Selection Area */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Build Your Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flight Selection */}
            <Card className={bookings.flight ? 'ring-2 ring-green-500' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Plane className="h-8 w-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">1. Select Flight</h3>
                  </div>
                  {bookings.flight && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                {bookings.flight ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">Flight Selected</p>
                    <p className="text-sm text-gray-600">View your selected flight below</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowFlightSearch(true)}>
                      Change Flight
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-4">Search and select your preferred flight.</p>
                    <Button className="w-full" variant="outline" onClick={() => { setShowFlightSearch(true); setShowHotelSearch(false); }}>
                      <Plane className="mr-2 h-4 w-4" />
                      Search Flights
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Hotel Selection */}
            <Card className={bookings.hotel ? 'ring-2 ring-green-500' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Hotel className="h-8 w-8 text-purple-600" />
                    <h3 className="font-semibold text-lg">2. Select Hotel</h3>
                  </div>
                  {bookings.hotel && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                {bookings.hotel ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">Hotel Selected</p>
                    <p className="text-sm text-gray-600">View your selected hotel below</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowHotelSearch(true)}>
                      Change Hotel
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-4">Search and select your preferred hotel.</p>
                    <Button className="w-full" variant="outline" onClick={() => { setShowHotelSearch(true); setShowFlightSearch(false); }}>
                      <Hotel className="mr-2 h-4 w-4" />
                      Search Hotels
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleBundle} disabled={!bookings.flight || !bookings.hotel}>
              Create Travel Package
            </Button>
          </div>
        </div>
      </section>

      {/* Flight Search Modal */}
      {showFlightSearch && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto" onClick={() => setShowFlightSearch(false)}>
          <div className="my-8 max-w-3xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Search Flights</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFlightSearch(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FlightSearchEmbed onSelect={(flight) => { setBookings(prev => ({ ...prev, flight })); setShowFlightSearch(false); }} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Hotel Search Modal */}
      {showHotelSearch && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto" onClick={() => setShowHotelSearch(false)}>
          <div className="my-8 max-w-3xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Search Hotels</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowHotelSearch(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <HotelSearchEmbed onSelect={(hotel) => { setBookings(prev => ({ ...prev, hotel })); setShowHotelSearch(false); }} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="space-y-6">
            {[
              'Search your flight and hotel separately from our platform.',
              'Select your preferred flight and hotel from live results.',
              'Complete the booking forms for both items.',
              'Both bookings are grouped under a single Travel Booking ID.',
              'Receive your Flight Ticket and Hotel Voucher together.',
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Your Complete Journey</h2>
          <p className="text-gray-600 mb-8">Book your flight and hotel together for a seamless travel experience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/flights">
              <Button size="lg" variant="default">Search Flights</Button>
            </Link>
            <Link href="/hotels">
              <Button size="lg" variant="outline">Search Hotels</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Embeddable flight search component
function FlightSearchEmbed({ onSelect }: { onSelect: (flight: unknown) => void }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) return;
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ from, to, date, passengers: '1', tripType: 'round_trip' });
      const res = await fetch(`/api/flights?${params}`);
      const json = await res.json();
      setResults(json.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="input-field" required />
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="input-field" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" required />
        <Button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
      </form>
      {searched && results.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-8">No flights found. Try different search criteria.</p>
      )}
      <div className="space-y-3">
        {(results as FlightResult[]).map((flight) => (
          <div key={flight.id} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => onSelect(flight)}>
            <div>
              <p className="font-medium">{flight.airline} <span className="text-sm text-gray-500">{flight.flight_number}</span></p>
              <p className="text-sm text-gray-600">{flight.from_airport} → {flight.to_airport}</p>
              <p className="text-xs text-gray-400">{new Date(flight.departure_time).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">${flight.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">per adult</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Embeddable hotel search component
function HotelSearchEmbed({ onSelect }: { onSelect: (hotel: unknown) => void }) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ destination, checkIn, checkOut, rooms: '1' });
      const res = await fetch(`/api/hotels?${params}`);
      const json = await res.json();
      setResults(json.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" className="input-field" required />
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-field" />
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-field" />
        <Button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
      </form>
      {searched && results.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-8">No hotels found. Try a different destination.</p>
      )}
      <div className="space-y-3">
        {(results as HotelResult[]).map((hotel) => (
          <div key={hotel.id} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-purple-300 transition-colors cursor-pointer" onClick={() => onSelect(hotel)}>
            <div>
              <p className="font-medium">{hotel.hotel_name}</p>
              <p className="text-sm text-gray-600">{hotel.check_in} to {hotel.check_out}</p>
              <p className="text-xs text-gray-400">Booking ID: {hotel.booking_id}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">${hotel.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500">total</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
