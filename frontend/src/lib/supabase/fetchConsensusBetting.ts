// fetchConsensusBetting.ts
import { supabase } from '../../supabase/client';
import { ConsensusBettingRow } from '../types/consensus_betting';

export async function fetchConsensusBetting(): Promise<ConsensusBettingRow[]> {
  const { data, error } = await supabase.from('consensus_betting').select('*');
  if (error) {
    console.error('Error fetching consensus betting:', error);
    return [];
  }
  return data as ConsensusBettingRow[];
}

