import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function generateDemoFlights(from: string, to: string, date: string, passengers: number, tripType: string) {
  const airlines = ['Air Canada', 'British Airways', 'Emirates', 'Lufthansa', 'Singapore Airlines'];
  const codes: Record<string, string> = { toronto: 'YYZ', vancouver: 'YVR', newyork: 'JFK', london: 'LHR', dubai: 'DXB', frankfurt: 'FRA', singapore: 'SIN', delhi: 'DEL', mumbai: 'BOM', sydney: 'SYD' };
  const fromCode = codes[from.toLowerCase().replace(/\s/g, '')] || from.slice(0, 3).toUpperCase();
  const toCode = codes[to.toLowerCase().replace(/\s/g, '')] || to.slice(0, 3).toUpperCase();
  const d = new Date(date + 'T10:00:00');
  return airlines.map((airline, i) => {
    const departure = new Date(d); departure.setHours(10 + i * 3, i * 20);
    const arrival = new Date(d); arrival.setHours(10 + i * 3 + (i === 0 ? 7 : i === 1 ? 9 : 12), i * 20);
    const basePrice = [650, 820, 1100, 750, 1350][i];
    return {
      id: `flight-demo-${i}`,
      airline,
      flight_number: `${airline.split(' ').map(w => w[0]).join('')}${100 + i}`,
      origin: from,
      destination: to,
      from_airport: fromCode,
      to_airport: toCode,
      departure_time: departure.toISOString(),
      arrival_time: arrival.toISOString(),
      duration: `${5 + i}h ${20 + i * 10}m`,
      stops: i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2,
      price: basePrice,
      price_per_adult: basePrice,
      price_per_child: basePrice * 0.7,
      available_seats: 180 - Math.floor(Math.random() * 50),
      trip_type: tripType === 'oneway' ? 'oneway' : 'roundtrip',
      status: 'available',
      cabin_class: 'economy',
    };
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const date = searchParams.get('date') || '';
    const passengers = parseInt(searchParams.get('passengers') || '1');
    const tripType = searchParams.get('tripType') || 'roundtrip';
    const returnDate = searchParams.get('returnDate');

    const supabase = await createClient();

    let query = supabase
      .from('flight_bookings')
      .select('*')
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false })
      .limit(50);

    if (to) query = query.ilike('to_airport', `%${to.toUpperCase().slice(0, 3)}%`);
    if (from) query = query.ilike('from_airport', `%${from.toUpperCase().slice(0, 3)}%`);

    const { data: existingBookings } = await query;

    let results = existingBookings || [];
    if (results.length === 0 && from && to && date) {
      results = generateDemoFlights(from, to, date, passengers, tripType);
    }

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
      filters: { from, to, date, passengers, tripType, returnDate },
    });
  } catch (err) {
    console.error('Flights API error:', err);
    return NextResponse.json({ error: 'Failed to search flights' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from, to, departure_date, return_date, departure_time, arrival_time, airline, flight_number, passengers, cabin_class, fare, trip_type } = body;

    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const customer_id = session?.user?.id || null;

    const markup = fare * 0.15;
    const total = fare + markup;
    const booking_id = `FB${Date.now().toString(36).toUpperCase()}`;

    const { data, error } = await supabase
      .from('flight_bookings')
      .insert({
        booking_id,
        customer_id,
        from_airport: from || 'N/A',
        to_airport: to || 'N/A',
        departure_date: departure_date || new Date().toISOString().split('T')[0],
        return_date: return_date || null,
        trip_type: trip_type || 'one_way',
        passengers: passengers || 1,
        cabin_class: cabin_class || 'economy',
        flight_details: { airline, flight_number, departure_time, arrival_time },
        fare: fare || 0,
        markup: markup,
        total: total,
        currency: 'USD',
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Flights booking error:', err);
    return NextResponse.json({ error: 'Failed to book flight' }, { status: 500 });
  }
}
