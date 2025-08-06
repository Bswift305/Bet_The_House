// fetchPlayerStats.ts
import { supabase } from '../../supabase/client';
import { PlayerStatsRow } from '../types/player_stats';

export async function fetchPlayerStats(): Promise<PlayerStatsRow[]> {
  const { data, error } = await supabase.from('player_stats').select('*');
  if (error) {
    console.error('Error fetching player stats:', error);
    return [];
  }
  return data as PlayerStatsRow[];
}


