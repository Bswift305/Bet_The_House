import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

export default function PBP2024HealthCheck() {
  const [plays, setPlays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('pbp_2024').select('*');
      if (error) {
        console.error('Error fetching pbp_2024:', error.message);
        setPlays([]);
      } else {
        setPlays(data ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading PBP data...</p>;
  if (!plays.length) return <p>No PBP data found.</p>;

  return (
    <div>
      <h2>Health Check: PBP 2024</h2>
      <pre>{JSON.stringify(plays, null, 2)}</pre>
    </div>
  );
}
