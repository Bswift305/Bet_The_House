import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

export default function OddsHistoryHealthCheck() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('odds_history').select('*');
      if (error) {
        console.error('Error fetching odds_history:', error.message);
        setData([]);
      } else {
        setData(data ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading odds history...</p>;
  if (!data.length) return <p>No odds history data found.</p>;

  return (
    <div>
      <h2>Health Check: Odds History</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}