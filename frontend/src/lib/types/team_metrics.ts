import { supabase } from '../client';

export async function fetchTeamMetrics() {
  const { data, error } = await supabase
    .from('team_metrics')
    .select('*');

  if (error) {
    console.error('Error fetching team metrics:', error.message);
    return [];
  }

  return data || [];
}
