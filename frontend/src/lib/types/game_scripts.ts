import { supabase } from '../client';

export async function fetchGameScripts() {
  const { data, error } = await supabase
    .from('game_scripts')
    .select('*');

  if (error) {
    console.error('Error fetching game scripts:', error.message);
    return [];
  }

  return data || [];
}

