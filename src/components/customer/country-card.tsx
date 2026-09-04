'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { COUNTRY_SLUGS } from '@/lib/constants';

interface CountryCardProps {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

export function CountryCard({ name, slug, description, imageUrl, featured }: CountryCardProps) {
  return (
    <Link href={`/countries/${slug}`}>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            Popular
          </span>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
          <div className="mt-3 flex items-center text-sm text-primary-600 font-medium">
            Explore Options
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

interface VisaCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export function VisaCard({ title, description, href }: VisaCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
          <span className="text-2xl">🌍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4 flex items-center text-sm text-primary-600 font-medium">
          Learn More
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
