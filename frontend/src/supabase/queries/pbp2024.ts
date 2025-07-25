import { supabase } from '../client';

export async function fetchPlayByPlay() {
  const { data, error } = await supabase
    .from('pbp_2024')
    .select('*');

  if (error) {
    console.error('Error fetching play-by-play data:', error);
    return [];
  }

  return data;
}
