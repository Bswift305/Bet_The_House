import React, { useEffect, useState } from 'react';
import fetchTeamMetrics from '@/lib/supabase/fetchTeamMetrics';

const TeamMetricsHealthCheck = () => {
  const [metrics, setMetrics] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTeamMetrics();
      console.log('Team Metrics Health Check:', data);
      setMetrics(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading team metrics...</p>;
  if (!metrics || metrics.length === 0) return <p>No team metrics found.</p>;

  return (
    <div>
      <h2>Health Check: Team Metrics</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};

export default TeamMetricsHealthCheck;