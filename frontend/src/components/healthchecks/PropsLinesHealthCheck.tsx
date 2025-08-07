import React, { useEffect, useState } from 'react';
import fetchPropsLines from '@/lib/supabase/fetchPropsLines';

const PropsLinesHealthCheck = () => {
  const [lines, setLines] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPropsLines();
      console.log('Props Lines Health Check:', data);
      setLines(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading props lines...</p>;
  if (!lines || lines.length === 0) return <p>No props lines found.</p>;

  return (
    <div>
      <h2>Health Check: Props Lines</h2>
      <pre>{JSON.stringify(lines, null, 2)}</pre>
    </div>
  );
};

export default PropsLinesHealthCheck;