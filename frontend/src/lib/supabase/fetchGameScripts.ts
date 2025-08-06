import { supabase } from '../../supabase/client'; // from within lib
import { GameScriptRow } from '../types/game_scripts';

export interface GameScriptRow {
  id: number;
  game_id: string;
  script: string;
}

  return (data ?? []) as GameScriptRow[];
}
