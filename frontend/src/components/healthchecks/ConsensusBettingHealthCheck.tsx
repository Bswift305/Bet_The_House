import React, { useEffect, useState } from 'react';
import fetchConsensusBetting from '@/lib/supabase/fetchConsensusBetting';

const ConsensusBettingHealthCheck = () => {
  const [bets, setBets] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchConsensusBetting();
      console.log('Consensus Betting Health Check:', data);
      setBets(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading consensus bets...</p>;
  if (!bets || bets.length === 0) return <p>No consensus bets found.</p>;

  return (
    <div>
      <h2>Health Check: Consensus Betting</h2>
      <pre>{JSON.stringify(bets, null, 2)}</pre>
    </div>
  );
};

export default ConsensusBettingHealthCheck;