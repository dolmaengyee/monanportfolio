import { createClient } from '@supabase/supabase-js'

/* ── Supabase Client ─────────────────────────────────
 *  Reads from environment variables defined in .env.local
 *  Copy .env.example → .env.local and fill in your values.
 *
 *  Required Supabase table:
 *
 *  create table contacts (
 *    id uuid default gen_random_uuid() primary key,
 *    name text not null,
 *    email text not null,
 *    phone text,
 *    message text not null,
 *    created_at timestamp with time zone default now()
 *  );
 * ──────────────────────────────────────────────────── */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseKey)
