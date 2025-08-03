import { supabase } from '../client';

export async function fetchConsensusBetting() {
  const { data, error } = await supabase
    .from('consensus_betting')
    .select('*');

  if (error) {
    console.error('Error fetching consensus betting:', error.message);
    return [];
  }

  return data || [];
}
