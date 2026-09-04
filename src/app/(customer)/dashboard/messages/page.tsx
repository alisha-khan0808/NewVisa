import { Metadata } from 'next';
import CustomerDashboardLayout from '../layout';

export const metadata: Metadata = { title: 'Messages — NewVisa Dashboard' };

const messages = [
  { id: 1, from: 'Sarah M. (Counsellor)', subject: 'Your Canada PR Application Update', date: '2026-09-02', unread: true },
  { id: 2, from: 'NewVisa Team', subject: 'Document Upload Required', date: '2026-09-01', unread: true },
  { id: 3, from: 'James K. (Counsellor)', subject: 'Consultation Confirmed', date: '2026-08-28', unread: false },
];

export default function MessagesPage() {
  return (
    <CustomerDashboardLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-4 flex items-start gap-4 hover:bg-gray-50 cursor-pointer ${msg.unread ? 'bg-blue-50/50' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-gray-900">{msg.from}</p>
                  {msg.unread && <span className="w-2 h-2 bg-primary-600 rounded-full" />}
                </div>
                <p className="text-sm text-gray-700 mt-0.5">{msg.subject}</p>
                <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
}
