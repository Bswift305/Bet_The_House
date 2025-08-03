import { supabase } from '../client';
import { TeamMetricsRow } from '../types/team_metrics';

export async function fetchTeamMetrics(): Promise<TeamMetricsRow[]> {
  const { data, error } = await supabase
    .from('team_metrics')
    .select('*');

  if (error) {
    console.error('Error fetching team metrics:', error.message);
    return [];
  }

  return (data ?? []) as TeamMetricsRow[];
}
