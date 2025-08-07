import React, { useEffect, useState } from 'react';
import { fetchUserTracking } from '@/lib/supabase/fetchUserTracking';

export default function UserTrackingHealthCheck() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchUserTracking();
      setLogs(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading user tracking data...</p>;
  if (!logs.length) return <p>No user tracking data found.</p>;

  return (
    <div>
      <h2>Health Check: User Tracking</h2>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
}