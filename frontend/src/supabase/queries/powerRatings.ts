import { supabase } from '../../supabase/client'; // from within lib

export async function fetchPowerRatings() {
  const { data, error } = await supabase
    .from('power_ratings')
    .select('*');

  if (error) {
    console.error('Error fetching power ratings:', error.message);
    return [];
  }

  return data || [];
}
