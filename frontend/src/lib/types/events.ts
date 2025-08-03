import { supabase } from '../client';

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*');

  if (error) {
    console.error('Error fetching events:', error.message);
    return [];
  }

  return data || [];
}
