// src/supabase/queries/teamStats.ts
import { supabase } from '../client';

export async function fetchTeamStats() {
  const { data, error } = await supabase
    .from('team_stats')
    .select('*');

  if (error) {
    console.error('Error fetching team stats:', error.message);
    return [];
  }

  return data || [];
}
