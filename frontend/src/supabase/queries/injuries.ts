import { supabase } from '../client';

export async function fetchInjuries() {
  const { data, error } = await supabase
    .from('injuries')
    .select('*');

  if (error) {
    console.error('Error fetching injuries:', error);
    return [];
  }

  return data;
}
