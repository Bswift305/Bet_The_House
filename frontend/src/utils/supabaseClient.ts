// frontend/src/utils/supabaseClient.ts

import createClient from '../utils/supabaseClient';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export the client for use across the app
export default supabase;
