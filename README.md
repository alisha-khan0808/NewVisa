# NewVisa

A unified Visa, Immigration & Travel Booking platform built with Next.js, Supabase, and TypeScript.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (copy `.env.example` to `.env.local`):
```bash
cp .env.example .env.local
```

3. Configure your Supabase project and update `.env.local` with your credentials.

4. Run database migrations:
```bash
# Apply migrations in supabase/migrations/ via Supabase dashboard or CLI
```

5. Start the development server:
```bash
npm run dev
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: Multi-Agent AI System

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (customer)/        # Customer-facing pages
│   ├── (admin)/           # Admin panel pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Reusable UI primitives
│   ├── customer/          # Customer components
│   ├── admin/             # Admin components
│   └── shared/            # Shared components
├── lib/                   # Utilities and config
│   └── supabase/          # Supabase clients
└── types/                 # TypeScript types
```
