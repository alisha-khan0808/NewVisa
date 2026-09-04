import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us — Get In Touch with NewVisa',
  description: 'Contact NewVisa for immigration and travel inquiries. We\'re here to help with your visa and travel needs.',
};

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-12 w-12 text-accent-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Have questions? Reach out to our team and we'll be happy to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="input-field w-full" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="input-field w-full" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="input-field w-full" rows={5} placeholder="How can we help?" />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                  <p className="text-sm text-gray-600">info@newvisa.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                  <p className="text-sm text-gray-600">support@newvisa.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Book a Consultation</h3>
                  <Link href="/consultation">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Schedule Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
