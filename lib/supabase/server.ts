import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Server-side client for SSR/SSG
export function createClient() {
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key are required');
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
    },
  });
}

// Admin client for server-side operations
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
