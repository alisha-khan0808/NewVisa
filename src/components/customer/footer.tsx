'use client';

import Link from 'next/link';
import { Globe, Plane, Hotel, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const popularCountries = [
  { name: 'Canada', href: '/countries/canada' },
  { name: 'Australia', href: '/countries/australia' },
  { name: 'United Kingdom', href: '/countries/uk' },
  { name: 'United States', href: '/countries/usa' },
  { name: 'Germany', href: '/countries/germany' },
  { name: 'New Zealand', href: '/countries/new-zealand' },
];

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="bg-primary-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Globe className="h-8 w-8 text-accent-400" />
              <span className="text-xl font-bold text-white">
                New<span className="text-accent-400">Visa</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Your journey abroad starts here. Immigration, visa assistance, and travel booking — all in one intelligent platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              {popularCountries.map((country) => (
                <li key={country.name}>
                  <Link
                    href={country.href}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3" />
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-accent-400" />
                info@newvisa.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-accent-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Plane className="h-4 w-4 text-accent-400" />
                Book a Consultation
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Hotel className="h-4 w-4 text-accent-400" />
                Travel Planning
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NewVisa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
