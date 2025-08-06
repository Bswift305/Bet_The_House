// fetchEvents.ts
import { supabase } from '../../supabase/client';
import { EventRow } from '../types/events';

export async function fetchEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase.from('events').select('*');
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data as EventRow[];
}

