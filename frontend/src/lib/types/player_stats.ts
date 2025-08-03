import { supabase } from '../client';

export async function fetchPlayerStats() {
  const { data, error } = await supabase
    .from('player_stats')
    .select('*');

  if (error) {
    console.error('Error fetching player stats:', error.message);
    return [];
  }

  return data || [];
}
