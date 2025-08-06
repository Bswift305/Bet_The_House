// fetchTeamMetrics.ts
import { supabase } from '../../supabase/client';
import { TeamMetricsRow } from '../types/team_metrics';

export async function fetchTeamMetrics(): Promise<TeamMetricsRow[]> {
  const { data, error } = await supabase.from('team_metrics').select('*');
  if (error) {
    console.error('Error fetching team metrics:', error);
    return [];
  }
  return data as TeamMetricsRow[];
}

