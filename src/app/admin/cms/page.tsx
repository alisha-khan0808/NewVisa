'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';

const pages = [
  { title: 'Canada Immigration', slug: '/countries/canada', type: 'Country Page', updated: '2026-09-01' },
  { title: 'Australia Immigration', slug: '/countries/australia', type: 'Country Page', updated: '2026-08-28' },
  { title: 'Canada PR Visa', slug: '/visa/canada-pr', type: 'Visa Service', updated: '2026-09-02' },
  { title: 'About Us', slug: '/about', type: 'CMS Page', updated: '2026-08-15' },
  { title: 'Contact Us', slug: '/contact', type: 'CMS Page', updated: '2026-08-15' },
];

const faqs = [
  { question: 'How long does a visa application take?', category: 'Process', order: 1 },
  { question: 'What documents are required?', category: 'Documents', order: 2 },
  { question: 'Can I apply for a visa online?', category: 'Process', order: 3 },
  { question: 'What is the success rate?', category: 'General', order: 4 },
];

const blogs = [
  { title: 'Top 5 Immigration Destinations for 2026', slug: 'top-5-immigration-destinations-2026', published: true, date: '2026-09-01' },
  { title: 'How to Improve Your CRS Score for Canada PR', slug: 'improve-crs-score-canada-pr', published: true, date: '2026-08-25' },
  { title: 'Student Visa Guide for Australia', slug: 'student-visa-guide-australia', published: false, date: '2026-08-20' },
];

export default function AdminCMSPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-500 mt-1">Manage website content, FAQs, and blog posts</p>
            </div>
            <Button>+ Add Content</Button>
          </div>

          <Tabs defaultValue="pages">
            <Tabs.List>
              <Tabs.Trigger value="pages">Pages ({pages.length})</Tabs.Trigger>
              <Tabs.Trigger value="faqs">FAQs ({faqs.length})</Tabs.Trigger>
              <Tabs.Trigger value="blogs">Blogs ({blogs.length})</Tabs.Trigger>
            </Tabs.List>

            <TabsContent value="pages">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pages.map((p) => (
                          <tr key={p.slug} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{p.slug}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{p.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{p.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faqs">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {faqs.map((faq) => (
                          <tr key={faq.order} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{faq.question}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{faq.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{faq.order}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blogs">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {blogs.map((b) => (
                          <tr key={b.slug} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{b.slug}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${b.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {b.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{b.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
