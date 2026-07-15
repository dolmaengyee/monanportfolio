import 'server-only'
import { neon } from '@neondatabase/serverless'

/* ── Neon Postgres (server-only) ─────────────────────
 *  Reads DATABASE_URL from the environment. On Vercel this is
 *  auto-injected when you connect a Neon database via
 *  Vercel Storage → Neon. Locally, run `vercel env pull .env.local`.
 *
 *  The template runs with ZERO env vars: when DATABASE_URL is
 *  unset, `sql` is null and every helper degrades gracefully
 *  (contact form reports "저장 설정 전", admin table is empty)
 *  instead of throwing.
 *
 *  Table (created automatically on first use):
 *
 *  CREATE TABLE IF NOT EXISTS contacts (
 *    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *    name text NOT NULL,
 *    email text,
 *    phone text,
 *    message text,
 *    created_at timestamptz DEFAULT now()
 *  );
 * ──────────────────────────────────────────────────── */

const databaseUrl = process.env.DATABASE_URL

const sql = databaseUrl ? neon(databaseUrl) : null

/** True when DATABASE_URL is set and queries can run. */
export function isDbConfigured(): boolean {
  return sql !== null
}

export interface ContactRecord {
  id: string
  name: string
  email: string | null
  phone: string | null
  message: string | null
  created_at: string
}

export interface ContactInput {
  name: string
  email?: string | null
  phone?: string | null
  message?: string | null
}

/** Ensure the contacts table exists. Runs lazily before read/write. */
async function ensureContactsTable(): Promise<void> {
  if (!sql) return
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text,
      phone text,
      message text,
      created_at timestamptz DEFAULT now()
    )
  `
}

/** Insert a contact submission. Returns false when the DB is not configured. */
export async function insertContact(input: ContactInput): Promise<boolean> {
  if (!sql) return false
  await ensureContactsTable()
  await sql`
    INSERT INTO contacts (name, email, phone, message)
    VALUES (${input.name}, ${input.email ?? null}, ${input.phone ?? null}, ${input.message ?? null})
  `
  return true
}

/** Fetch all contact submissions, newest first. Empty when not configured. */
export async function getContacts(): Promise<ContactRecord[]> {
  if (!sql) return []
  await ensureContactsTable()
  const rows = await sql`
    SELECT id, name, email, phone, message, created_at
    FROM contacts
    ORDER BY created_at DESC
  `
  return rows as ContactRecord[]
}
