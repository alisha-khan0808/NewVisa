'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { USER_ROLES, AI_INTENT } from '@/lib/constants';

const QUICK_ACTIONS = [
  { label: 'Check Eligibility', intent: 'eligibility' },
  { label: 'Visa Information', intent: 'immigration' },
  { label: 'Book Consultation', intent: 'immigration' },
  { label: 'Track Application', intent: 'application' },
  { label: 'Flight Booking', intent: 'travel' },
  { label: 'Hotel Booking', intent: 'travel' },
] as const;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your NewVisa assistant. I can help you with visa information, eligibility checks, document requirements, application tracking, flight and hotel bookings. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content.trim(), conversationId: 'default' }),
      });
      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I\'m sorry, I couldn\'t process that. Please try again or contact support.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: 'I\'m having trouble connecting. Please try again later or contact our support team.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (label: string, intent: AIIntent) => {
    handleSend(label);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300',
          isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-primary-600 text-white hover:bg-primary-700'
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-primary-600 text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">NewVisa Assistant</h3>
              <p className="text-xs text-primary-200">Always here to help</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-primary-200">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-xl px-4 py-2.5 text-sm',
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl rounded-bl-md px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {showSuggestions && messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.label, action.intent)}
                    className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type your message..."
                className="flex-1 h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                disabled={isLoading}
              />
              <Button
                size="icon"
                className="h-10 w-10"
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
