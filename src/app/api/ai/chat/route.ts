import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Get user if authenticated
    const { data: { user } } = await supabase.auth.getUser();
    const customerId = user?.id;

    // Simple intent classification for MVP
    const lowerMessage = message.toLowerCase();
    let intent: string = 'support';
    let response = '';

    if (lowerMessage.includes('eligib') || lowerMessage.includes('qualify') || lowerMessage.includes('prerequisites')) {
      intent = 'eligibility';
      response = 'To check your eligibility for a visa, you can use our free eligibility assessment tool. It takes about 5 minutes and covers personal information, destination preferences, education, work experience, language skills, and financial information. Would you like to start the assessment?';
    } else if (lowerMessage.includes('document') || lowerMessage.includes('paper') || lowerMessage.includes('upload')) {
      intent = 'document';
      const docsList = customerId
        ? 'You have uploaded 4 documents. 2 are approved, 1 is under review, and 1 is pending upload. Would you like to see the full list?'
        : 'Common documents include: Passport, Photographs, Education Certificates, Bank Statements, Language Test Results, and Employment Letters. After creating an account, you can upload documents through your dashboard.';
      response = docsList;
    } else if (lowerMessage.includes('application') || lowerMessage.includes('status') || lowerMessage.includes('track')) {
      intent = 'application';
      if (customerId) {
        response = 'You have 3 active applications: Canada PR (Under Review), Australia Skilled Migration (Documents Pending), and UK Student Visa (Submitted). Would you like details on any specific application?';
      } else {
        response = 'Please log in to your account to check your application status. Once logged in, you can view all your applications and their current status from your dashboard.';
      }
    } else if (lowerMessage.includes('flight') || lowerMessage.includes('book flight') || lowerMessage.includes('airline')) {
      intent = 'travel';
      response = 'We offer flight booking services to destinations worldwide. You can search for one-way, round-trip, or multi-city flights. Our platform connects you with top travel suppliers for the best fares. Would you like to search for flights?';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay')) {
      intent = 'travel';
      response = 'We offer hotel booking services with thousands of properties worldwide. Search by destination, dates, and preferences to find the best rates. Would you like to search for hotels?';
    } else if (lowerMessage.includes('consultation') || lowerMessage.includes('appoint') || lowerMessage.includes('meet')) {
      intent = 'immigration';
      response = 'You can book a consultation with our immigration experts. We offer phone calls, video consultations, and in-office visits. Our experts will guide you through the entire process. Would you like to book a consultation?';
    } else if (lowerMessage.includes('visa') || lowerMessage.includes('immigrat') || lowerMessage.includes('pr') || lowerMessage.includes('citizenship')) {
      intent = 'immigration';
      response = 'We offer immigration services for 50+ countries including Canada, Australia, UK, USA, Germany, and New Zealand. Popular visa categories include Permanent Residency, Student Visa, Work Visa, Skilled Immigration, Visitor Visa, and Business Visa. Which country are you interested in?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      intent = 'support';
      response = 'Hello! Welcome to NewVisa. I can help you with:\n\n• Visa and immigration information\n• Eligibility assessments\n• Document requirements\n• Application tracking\n• Flight and hotel bookings\n• Consultation bookings\n\nHow can I assist you today?';
    } else if (lowerMessage.includes('thank')) {
      intent = 'support';
      response = 'You\'re welcome! Is there anything else I can help you with today?';
    } else {
      intent = 'support';
      response = 'I\'d be happy to help you with that. Could you provide more details? I can assist with visa information, eligibility checks, document requirements, application tracking, flight and hotel bookings, and consultation scheduling. For complex cases, I can also connect you with one of our counsellors.';
    }

    // Save conversation if user is authenticated
    if (customerId) {
      const { data: existingConv } = await supabase
        .from('ai_conversations')
        .select('id')
        .eq('customer_id', customerId)
        .eq('session_id', conversationId || 'default')
        .single();

      let conversationId_db = existingConv?.id;

      if (!conversationId_db) {
        const { data: newConv } = await supabase
          .from('ai_conversations')
          .insert({ customer_id: customerId, session_id: conversationId || 'default' })
          .select('id')
          .single();
        conversationId_db = newConv?.id;
      }

      if (conversationId_db) {
        // Save user message
        await supabase.from('ai_messages').insert({
          conversation_id: conversationId_db,
          role: 'user',
          content: message,
          intent: intent as any,
        });

        // Save assistant response
        await supabase.from('ai_messages').insert({
          conversation_id: conversationId_db,
          role: 'assistant',
          content: response,
          intent: intent as any,
          agent_used: intent,
        });
      }
    }

    return NextResponse.json({ response, intent });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
