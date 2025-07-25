import { supabase } from '../client';

export async function fetchPropsLines() {
  const { data, error } = await supabase
    .from('props_lines')
    .select('*');

  if (error) {
    console.error('Error fetching props lines:', error);
    return [];
  }

  return data;
}
