import { supabase } from '../../supabase/client';
import { GameScriptRow } from '../types/game_scripts';

export async function fetchGameScripts(): Promise<GameScriptRow[]> {
  const { data, error } = await supabase
    .from('game_scripts')
    .select('*');

  if (error) {
    console.error('Error fetching game scripts:', error);
    return [];
  }

  return data as GameScriptRow[];
}
