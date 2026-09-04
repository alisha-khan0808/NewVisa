import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, ArrowRight, BookOpen, FileText, Clock, Shield, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COUNTRY_SLUGS } from '@/lib/constants';

interface CountryPageProps {
  params: Promise<{ slug: string }>;
}

const countryData: Record<string, { name: string; description: string; features?: string[]; why: string; work: string; study: string; pr: string; family: string; visitor: string }> = {
  canada: {
    name: 'Canada',
    description: 'Canada is one of the most welcoming countries for immigrants, offering diverse pathways for skilled workers, students, and families.',
    why: 'Canada consistently ranks as one of the best countries to live in, with high quality of life, excellent healthcare, world-class education, and a strong economy that welcomes skilled immigrants.',
    work: 'Through Express Entry, Provincial Nominee Programs (PNP), and LMIA-backed work permits, Canada offers numerous pathways for skilled workers.',
    study: 'Canada is home to world-renowned universities and colleges. International students can work part-time during studies and apply for Post-Graduation Work Permits (PGWP).',
    pr: 'Express Entry is Canada\'s flagship immigration system, managing applications for the Federal Skilled Worker, Federal Skilled Trades, and Canadian Experience Class programs.',
    family: 'Canada offers Family Sponsorship for spouses, partners, children, parents, and grandparents of Canadian citizens and permanent residents.',
    visitor: 'Visitor visas allow tourists, family visitors, and business travelers to enter Canada temporarily.',
  },
  australia: {
    name: 'Australia',
    description: 'Australia offers world-class living, strong economy, and diverse immigration pathways through points-based system.',
    why: 'Australia offers an excellent quality of life, strong economy, multicultural society, and a transparent points-based immigration system that rewards skills and experience.',
    work: 'Employer-Sponsored Visas, Temporary Skill Shortage (TSS) visa, and Skilled Independent Visa provide pathways to work in Australia.',
    study: 'Australia has globally recognized universities with excellent research facilities. International graduates can apply for Temporary Graduate visas.',
    pr: 'Skilled Independent Visa (subclass 189) and Skilled Nominated Visa (subclass 190) are the main permanent residency pathways.',
    family: 'Partner visas, Child visas, Parent visas, and Other Family visas allow family reunification in Australia.',
    visitor: 'Visitor visas (subclass 600) allow tourism, business visits, and family visits to Australia.',
  },
  uk: {
    name: 'United Kingdom',
    description: 'The UK offers a points-based immigration system with opportunities for skilled workers, students, and innovators.',
    why: 'The UK combines rich history with modern innovation. Its points-based immigration system provides clear pathways for skilled workers and entrepreneurs.',
    work: 'Skilled Worker Visa, Health and Care Worker Visa, and Global Talent Visa provide pathways for qualified professionals.',
    study: 'UK universities are globally recognized. The Graduate Route allows international students to work for 2-3 years after graduation.',
    pr: 'After 5 years on a qualifying visa, applicants can apply for Indefinite Leave to Remain (ILR) and eventually British citizenship.',
    family: 'Family visas allow partners, children, parents, and other relatives of UK residents to join their family members.',
    visitor: 'Standard Visitor visas allow tourism, business meetings, and short courses in the UK for up to 6 months.',
  },
};

export async function generateStaticParams() {
  return Object.entries(COUNTRY_SLUGS)
    .filter(([, slug]) => countryData[slug])
    .map(([, slug]) => ({ slug }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = countryData[slug];
  if (!data) return { title: 'Country — NewVisa' };
  return {
    title: `${data.name} Immigration — Visa Services & Opportunities | NewVisa`,
    description: data.description,
  };
}

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const data = countryData[slug];
  if (!data) notFound();

  const sections = [
    { id: 'work', title: 'Work Opportunities', icon: Plane, content: data.work },
    { id: 'study', title: 'Study Options', icon: BookOpen, content: data.study },
    { id: 'pr', title: 'Permanent Residency', icon: Shield, content: data.pr },
    { id: 'family', title: 'Family Sponsorship', icon: FileText, content: data.family },
    { id: 'visitor', title: 'Visitor Visa', icon: Clock, content: data.visitor },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-300 text-sm mb-4">
            <Link href="/countries" className="hover:text-white">Countries</Link>
            <span>/</span>
            <span className="text-white">{data.name}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{data.name} Immigration</h1>
          <p className="text-lg text-primary-200 max-w-2xl">{data.description}</p>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Why {data.name}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{data.why}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Immigration Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <section.icon className="h-5 w-5 text-primary-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{section.content}</p>
                  <Link href={`/countries/${slug}/visa/${section.id}`}>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-600">
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore {data.name}?</h2>
          <p className="text-primary-200 mb-8">Take our free eligibility assessment or book a consultation with our experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eligibility">
              <Button size="lg" variant="accent">Check Eligibility</Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Book Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
