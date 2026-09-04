import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, visa_type, preferred_date, preferred_time, consultation_type } = body;

    if (!name || !email || !phone || !preferred_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('consultations')
      .insert({
        name,
        email,
        phone,
        country: country || '',
        visa_type: visa_type || '',
        preferred_date,
        preferred_time: preferred_time || '',
        consultation_type: consultation_type || 'phone_call',
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Failed to book consultation' }, { status: 500 });
  }
}
