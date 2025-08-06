// fetchInjuries.ts
import { supabase } from '../../supabase/client';
import { InjuryRow } from '../types/injuries';

export async function fetchInjuries(): Promise<InjuryRow[]> {
  const { data, error } = await supabase.from('injuries').select('*');
  if (error) {
    console.error('Error fetching injuries:', error);
    return [];
  }
  return data as InjuryRow[];
}
