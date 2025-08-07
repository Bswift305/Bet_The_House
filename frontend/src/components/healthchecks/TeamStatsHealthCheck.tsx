import React, { useEffect, useState } from 'react';
import { fetchTeamStats } from '@/supabase/queries/teamStats';

export default function TeamStatsHealthCheck() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTeamStats();
      setStats(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading team stats...</p>;
  if (!stats.length) return <p>No team stats found.</p>;

  return (
    <div>
      <h2>Health Check: Team Stats</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}