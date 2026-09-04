import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'flight' | 'hotel' | 'travel'
    const supabase = await createClient();

    if (type === 'flight' || !type) {
      const { data: flights, error: flightError } = await supabase
        .from('flight_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (flightError) throw flightError;

      const flightResults = (flights || []).map((b) => ({
        id: b.booking_id,
        customer_id: b.customer_id,
        from_airport: b.from_airport,
        to_airport: b.to_airport,
        departure_date: b.departure_date,
        return_date: b.return_date,
        passengers: b.passengers,
        cabin_class: b.cabin_class,
        total: b.total,
        currency: b.currency,
        status: b.status,
        created_at: b.created_at,
      }));

      return NextResponse.json({ success: true, data: flightResults, count: flightResults.length });
    }

    if (type === 'hotel') {
      const { data: hotels, error: hotelError } = await supabase
        .from('hotel_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (hotelError) throw hotelError;

      const hotelResults = (hotels || []).map((b) => ({
        id: b.booking_id,
        customer_id: b.customer_id,
        hotel_id: b.hotel_id,
        hotel_name: b.hotel_name,
        check_in: b.check_in,
        check_out: b.check_out,
        rooms: b.rooms,
        adults: b.adults,
        children: b.children,
        total: b.total,
        currency: b.currency,
        status: b.status,
        created_at: b.created_at,
      }));

      return NextResponse.json({ success: true, data: hotelResults, count: hotelResults.length });
    }

    if (type === 'travel') {
      const { data: travel, error: travelError } = await supabase
        .from('travel_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (travelError) throw travelError;

      return NextResponse.json({ success: true, data: travel || [], count: travel?.length || 0 });
    }

    return NextResponse.json({ success: true, data: [], count: 0 });
  } catch (err) {
    console.error('Admin bookings API error:', err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
