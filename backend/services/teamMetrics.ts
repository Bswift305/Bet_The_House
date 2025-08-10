import { supabaseServer } from "../utils/supabaseServer";

export type TeamMetric = {
  id: number;
  team?: string | null;
  // add your real columns here as you formalize schema
};

export async function getTeamMetrics(limit = 10) {
  const { data, error } = await supabaseServer
    .from("team_metrics")
    .select("*")
    .limit(limit);

  if (error) {
    throw new Error(`getTeamMetrics failed: ${error.message}`);
  }
  return data as TeamMetric[];
}

