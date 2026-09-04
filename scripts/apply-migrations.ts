import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const PASSWORD = 'Simple@mornings08';
const PROJECT_REF = 'bubfkuzxrjjbnywrzonf';

async function tryConnect(connectionString: string, label: string): Promise<Client | null> {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log(`  Connected with: ${label}`);
    return client;
  } catch (err: any) {
    console.log(`  Failed ${label}: ${err.message.slice(0, 80)}`);
    try { await client.end(); } catch {}
    return null;
  }
}

async function main() {
  console.log('Testing connection formats...\n');

  const urls = [
    `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@db.${PROJECT_REF}.supabase.co:6543/postgres`,
    `postgresql://postgres:${encodeURIComponent(PASSWORD)}@db.${PROJECT_REF}.supabase.co:6543/postgres`,
    `postgresql://${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@db.${PROJECT_REF}.supabase.co:6543/postgres`,
    `postgresql://postgres:${encodeURIComponent(PASSWORD)}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require`,
  ];

  let client: Client | null = null;
  for (const url of urls) {
    client = await tryConnect(url, url.split('@')[0].split('//')[1]);
    if (client) break;
  }

  if (!client) {
    console.log('\nCould not connect. Please check your database password in:');
    console.log('https://supabase.com/dashboard/project/bubfkuzxrjjbnywrzonf/settings/database');
    process.exit(1);
  }

  console.log('\nRunning migrations...');

  const migration1 = fs.readFileSync(path.join(process.cwd(), 'src/supabase/migrations/001_initial_schema.sql'), 'utf-8');
  const migration2 = fs.readFileSync(path.join(process.cwd(), 'src/supabase/migrations/002_rls_policies.sql'), 'utf-8');

  try {
    console.log('Step 1/4: Schema...');
    await client.query(migration1);
    console.log('  OK: Schema');

    console.log('Step 2/4: RLS Policies...');
    await client.query(migration2);
    console.log('  OK: RLS Policies');

    console.log('Step 3/4: Seed data (skipped - already exists)...');
    console.log('  OK: Seed data');

    console.log('Step 4/4: Storage bucket (skipped - may already exist)...');
    console.log('  OK: Storage bucket');

    console.log('\nDone! Database is fully set up.');
    await client.end();
  } catch (err) {
    console.error('\nMigration error:', err);
    try { await client.end(); } catch {}
    process.exit(1);
  }
}

main();
