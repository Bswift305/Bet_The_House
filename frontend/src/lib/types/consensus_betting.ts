// consensus_betting.ts
export interface ConsensusBettingRow {
  id: number;
  game_id: string;
  team: string;
  bet_percentage: number;
  timestamp: string;
}

