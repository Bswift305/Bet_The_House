import React, { useEffect, useState } from 'react';
import { fetchTeamStats } from '../../supabase/queries/teamStats';

interface TeamRow {
  id: string;
  team_name: string;
  season: string;
  stat_type: string;
  stat_value: number;
  updated_at: string;
}

export default function TeamStatsWidget() {
  const [stats, setStats] = useState<TeamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('All');
  const [seasons, setSeasons] = useState<number[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | 'All'>('All');

  useEffect(() => {
    let mounted = true;
    fetchTeamStats().then((data) => {
      if (!mounted) return;
      setStats(data);
      const uniqueSeasons = Array.from(
        new Set(data.map((d) => Number(d.season)).filter((n) => Number.isFinite(n)))
      ) as number[];
      setSeasons(uniqueSeasons);
      const uniqueTeams = Array.from(new Set(data.map((d) => d.team_name))).filter(Boolean).sort();
      setTeams(['All', ...uniqueTeams]);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = stats.filter((row) => {
    const teamOk = selectedTeam === 'All' || row.team_name === selectedTeam;
    const seasonOk = selectedSeason === 'All' || Number(row.season) === selectedSeason;
    return teamOk && seasonOk;
  });

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Team Stats</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4 flex gap-4">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-gray-800 text-white px-2 py-1 rounded"
            >
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={selectedSeason}
              onChange={(e) =>
                setSelectedSeason(e.target.value === 'All' ? 'All' : Number(e.target.value))
              }
              className="bg-gray-800 text-white px-2 py-1 rounded"
            >
              <option value="All">All Seasons</option>
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <ul>
            {filtered.map((r) => (
              <li key={r.id} className="mb-2">
                <p>Team: {r.team_name}</p>
                <p>Season: {r.season}</p>
                <p>{r.stat_type}: {r.stat_value}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
