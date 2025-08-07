import React, { useEffect, useState } from 'react';
import fetchPlayerStats from '@/lib/supabase/fetchPlayerStats';

const PlayerStatsHealthCheck = () => {
  const [stats, setStats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPlayerStats();
      console.log('Player Stats Health Check:', data);
      setStats(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading player stats...</p>;
  if (!stats || stats.length === 0) return <p>No player stats found.</p>;

  return (
    <div>
      <h2>Health Check: Player Stats</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
};

export default PlayerStatsHealthCheck;