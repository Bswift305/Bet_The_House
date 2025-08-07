import React, { useEffect, useState } from 'react';
import fetchGameScripts from '@/lib/supabase/fetchGameScripts';

const GameScriptsHealthCheck = () => {
  const [scripts, setScripts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchGameScripts();
      console.log('Game Scripts Health Check:', data);
      setScripts(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading game scripts...</p>;
  if (!scripts || scripts.length === 0) return <p>No game scripts found.</p>;

  return (
    <div>
      <h2>Health Check: Game Scripts</h2>
      <pre>{JSON.stringify(scripts, null, 2)}</pre>
    </div>
  );
};

export default GameScriptsHealthCheck;
