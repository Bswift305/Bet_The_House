// fetchPropsLines.ts
import { supabase } from '../../supabase/client';
import { PropsLineRow } from '../types/props_lines';

export async function fetchPropsLines(): Promise<PropsLineRow[]> {
  const { data, error } = await supabase.from('props_lines').select('*');
  if (error) {
    console.error('Error fetching props lines:', error);
    return [];
  }
  return data as PropsLineRow[];
}

