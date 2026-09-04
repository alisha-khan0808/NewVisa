import { Metadata } from 'next';
import { CountryCard } from '@/components/customer/country-card';
import { COUNTRY_SLUGS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Immigration Countries — Explore Visa Options Worldwide',
  description: 'Browse immigration and visa options for Canada, Australia, UK, USA, Germany, New Zealand, and more.',
};

const featuredCountries = [
  { name: 'Canada', slug: 'canada', description: 'Express Entry, PNP, Study and Work permits for skilled professionals seeking a better life.', imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92be?w=600&h=400&fit=crop', featured: true },
  { name: 'Australia', slug: 'australia', description: 'Skilled Migration, Employer-Sponsored Visas, and Regional Opportunities.', imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&h=400&fit=crop', featured: true },
  { name: 'United Kingdom', slug: 'uk', description: 'Skilled Worker Visa, Student Visa, and Innovator Visa pathways.', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop', featured: true },
  { name: 'United States', slug: 'usa', description: 'H-1B, L-1, O-1 Visas, Green Card options, and EB-5 Investor Visa.', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop' },
  { name: 'Germany', slug: 'germany', description: 'EU Blue Card, Job Seeker Visa, and Skilled Immigration Act pathways.', imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop' },
  { name: 'New Zealand', slug: 'new-zealand', description: 'Skilled Migrant Category, Work to Residence, and Study pathways.', imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop' },
  { name: 'UAE', slug: 'uae', description: 'Golden Visa, Employment Visa, and Investor Visa for Dubai and Abu Dhabi.', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop' },
  { name: 'Singapore', slug: 'singapore', description: 'Employment Pass, EntrePass, and Tech Pass for professionals and entrepreneurs.', imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop' },
];

export default function CountriesPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Explore Countries</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Discover visa and immigration opportunities across the globe. Find the perfect destination for your future.
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCountries.map((country) => (
              <CountryCard key={country.name} {...country} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
