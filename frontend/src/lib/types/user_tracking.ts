import { supabase } from '../client';

export async function fetchUserTracking() {
  const { data, error } = await supabase
    .from('user_tracking')
    .select('*');

  if (error) {
    console.error('Error fetching user tracking:', error.message);
    return [];
  }

  return data || [];
}

