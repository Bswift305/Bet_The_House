// src/supabase/queries/powerRatings.ts
import { supabase } from '../client';

export async function fetchPowerRatings() {
  const { data, error } = await supabase
    .from('power_ratings')
    .select('*');

  if (error) {
    console.error('Error fetching power ratings:', error.message);
    return [];
  }

  return data || [];
}
