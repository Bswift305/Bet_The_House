import { useEffect, useState } from 'react';
import { getRecentPlayerStats } from '../supabase/queries/playerStats';

export default function PlayerStats() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const data = await getRecentPlayerStats();
      setStats(data);
    }

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-red-500 text-xl mb-2">Recent Player Stats</h2>
      <ul className="space-y-1 text-sm">
        {stats.map((stat, i) => (
          <li key={i} className="text-white border-b border-gray-600 py-1">
            <strong>{stat.player_name}</strong> — {stat.stat_type}: {stat.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
