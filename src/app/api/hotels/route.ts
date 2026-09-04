import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || '';
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const rooms = parseInt(searchParams.get('rooms') || '1');

    const supabase = await createClient();

    let query = supabase
      .from('hotel_bookings')
      .select('*')
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false })
      .limit(50);

    if (destination) query = query.ilike('hotel_name', `%${destination}%`);

    const { data } = await query;

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
      filters: { destination, checkIn, checkOut, rooms },
    });
  } catch (err) {
    console.error('Hotels API error:', err);
    return NextResponse.json({ error: 'Failed to search hotels' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hotel_id, hotel_name, check_in, check_out, rooms, adults, children, room_details, rate, trip_type } = body;

    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const customer_id = session?.user?.id || null;

    const markup = rate * 0.15;
    const total = rate * (rooms || 1) + markup;
    const booking_id = `HB${Date.now().toString(36).toUpperCase()}`;

    const { data, error } = await supabase
      .from('hotel_bookings')
      .insert({
        booking_id,
        customer_id,
        hotel_id: hotel_id || '',
        hotel_name: hotel_name || 'Selected Hotel',
        check_in: check_in || new Date().toISOString().split('T')[0],
        check_out: check_out || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        rooms: rooms || 1,
        adults: adults || 1,
        children: children || 0,
        room_details: room_details || {},
        rate: rate || 0,
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
    console.error('Hotels booking error:', err);
    return NextResponse.json({ error: 'Failed to book hotel' }, { status: 500 });
  }
}
