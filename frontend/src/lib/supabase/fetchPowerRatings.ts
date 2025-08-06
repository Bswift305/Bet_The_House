// fetchPowerRatings.ts
import { supabase } from '../../supabase/client';
import { PowerRatingRow } from '../types/power_ratings';

export async function fetchPowerRatings(): Promise<PowerRatingRow[]> {
  const { data, error } = await supabase.from('power_ratings').select('*');
  if (error) {
    console.error('Error fetching power ratings:', error);
    return [];
  }
  return data as PowerRatingRow[];
}


