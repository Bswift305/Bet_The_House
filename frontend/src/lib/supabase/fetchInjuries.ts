import { supabase } from '../client';
import { InjuryRow } from '../types/injuries';

export async function fetchInjuries(): Promise<InjuryRow[]> {
  const { data, error } = await supabase
    .from('injuries')
    .select('*')
    .order('dateIso', { ascending: false });

  if (error) {
    console.error('Error fetching injuries:', error.message);
    return [];
  }

  return (data ?? []) as InjuryRow[];
}
