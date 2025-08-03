import { supabase } from '../client';
import { EventRow } from '../types/events';

export async function fetchEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('dateIso', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error.message);
    return [];
  }

  return (data ?? []) as EventRow[];
}
