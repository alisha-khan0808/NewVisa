import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date_of_birth, country_of_residence, preferred_country, preferred_city, immigration_objective } = body;

    if (!name || !email || !phone || !preferred_country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('eligibility_assessments')
      .insert({
        name,
        email,
        phone,
        date_of_birth: date_of_birth || '',
        country_of_residence: country_of_residence || '',
        preferred_country,
        preferred_city: preferred_city || '',
        immigration_objective: immigration_objective || '',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 });
  }
}
