import { supabase } from '../../supabase/client';
import { ConsensusBettingRow } from '../types/consensus_betting';

export async function fetchConsensusBetting(): Promise<ConsensusBettingRow[]> {
  const { data, error } = await supabase
    .from('consensus_betting')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching consensus betting data:', error.message);
    return [];
  }

  return data ?? [];
}
