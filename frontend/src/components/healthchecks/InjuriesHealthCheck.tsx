import React, { useEffect, useState } from 'react';
import fetchInjuries from '@/lib/supabase/fetchInjuries';

const InjuriesHealthCheck = () => {
  const [injuries, setInjuries] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchInjuries();
      console.log('Injuries Health Check:', data);
      setInjuries(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading injuries...</p>;
  if (!injuries || injuries.length === 0) return <p>No injury data found.</p>;

  return (
    <div>
      <h2>Health Check: Injuries</h2>
      <pre>{JSON.stringify(injuries, null, 2)}</pre>
    </div>
  );
};

export default InjuriesHealthCheck;