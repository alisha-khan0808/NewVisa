'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText, Users, Calendar, Plane, Hotel, CreditCard,
  MessageSquare, ChevronRight, Clock, CheckCircle, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { LEAD_STATUS, APPLICATION_STATUS, DOCUMENT_STATUS, CONSULTATION_TYPE } from '@/lib/constants';

const statusStyles: Record<string, 'success' | 'warning' | 'error' | 'default' | 'info'> = {
  new: 'info', contacted: 'default', qualified: 'info', documents_pending: 'warning',
  consultation_scheduled: 'default', application_in_progress: 'default', submitted: 'info',
  under_review: 'warning', approved: 'success', rejected: 'error', closed: 'default',
};

const docStatusStyles: Record<string, 'success' | 'warning' | 'error' | 'default' | 'info'> = {
  requested: 'default', uploaded: 'info', under_review: 'warning', approved: 'success',
  rejected: 'error', re_upload_required: 'error',
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { label: 'Applications', value: '3', icon: FileText, href: '/dashboard/applications' },
    { label: 'Documents', value: '12', icon: FileText, href: '/dashboard/documents' },
    { label: 'Consultations', value: '1', icon: Calendar, href: '/dashboard/consultations' },
    { label: 'Bookings', value: '2', icon: Plane, href: '/dashboard/bookings' },
  ];

  const applications = [
    { id: 'APP-001', country: 'Canada', type: 'Permanent Residency', status: 'under_review', updated: '2 days ago' },
    { id: 'APP-002', country: 'Australia', type: 'Skilled Migration', status: 'documents_pending', updated: '1 week ago' },
    { id: 'APP-003', country: 'UK', type: 'Student Visa', status: 'submitted', updated: '3 days ago' },
  ];

  const documents = [
    { id: 'DOC-001', type: 'Passport', status: 'approved' },
    { id: 'DOC-002', type: 'Education Certificate', status: 'approved' },
    { id: 'DOC-003', type: 'Bank Statement', status: 'under_review' },
    { id: 'DOC-004', type: 'IELTS Results', status: 'uploaded' },
  ];

  const consultations = [
    { id: 'CON-001', date: '2026-09-10', time: '10:00 AM', type: 'video', status: 'scheduled' },
  ];

  const bookings = [
    { id: 'TRV-001', type: 'Flight', from: 'DEL', to: 'YYZ', date: '2026-10-15', status: 'confirmed' },
    { id: 'TRV-002', type: 'Hotel', name: 'Toronto Grand Hotel', checkIn: '2026-10-15', status: 'confirmed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your immigration journey.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="applications">Applications</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="consultations">Consultations</Tabs.Trigger>
            <Tabs.Trigger value="bookings">Bookings</Tabs.Trigger>
          </Tabs.List>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Applications</CardTitle>
                  <Link href="/dashboard/applications" className="text-sm text-primary-600">View all</Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{app.id}</p>
                          <p className="text-xs text-gray-500">{app.country} — {app.type}</p>
                        </div>
                        <Badge variant={statusStyles[app.status]}>
                          {app.status.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Documents */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Link href="/dashboard/documents" className="text-sm text-primary-600">View all</Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                        <Badge variant={docStatusStyles[doc.status]}>{doc.status.replace(/_/g, ' ')}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{app.id} — {app.country}</p>
                        <p className="text-sm text-gray-500">{app.type} • Updated {app.updated}</p>
                      </div>
                      <Badge variant={statusStyles[app.status]}>{app.status.replace(/_/g, ' ')}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.type}</p>
                          <p className="text-sm text-gray-500">{doc.id}</p>
                        </div>
                      </div>
                      <Badge variant={docStatusStyles[doc.status]}>{doc.status.replace(/_/g, ' ')}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle>My Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultations.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{c.id}</p>
                        <p className="text-sm text-gray-500">{c.date} at {c.time} — {c.type}</p>
                      </div>
                      <Badge variant="info">{c.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {b.type === 'Flight' ? <Plane className="h-5 w-5 text-blue-500" /> : <Hotel className="h-5 w-5 text-purple-500" />}
                        <div>
                          <p className="font-medium text-gray-900">{b.id} — {b.type}</p>
                          <p className="text-sm text-gray-500">
                            {b.type === 'Flight' ? `${b.from} → ${b.to} on ${b.date}` : `${b.name} from ${b.checkIn}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="success">{b.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
