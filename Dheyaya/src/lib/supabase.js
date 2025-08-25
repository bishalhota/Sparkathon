import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback client for demo purposes if env vars are missing
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using demo mode.');
  // Create a mock client for demo purposes
  supabase = {
    auth: {
      signUp: () => Promise.reject(new Error('Demo mode - Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Demo mode - Supabase not configured')),
      signOut: () => Promise.resolve(),
      getUser: () => Promise.resolve({ data: { user: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.reject(new Error('Demo mode')) }) }),
      insert: () => ({ select: () => ({ single: () => Promise.reject(new Error('Demo mode')) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.reject(new Error('Demo mode')) }) }) })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };