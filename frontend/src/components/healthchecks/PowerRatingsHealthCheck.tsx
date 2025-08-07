import React, { useEffect, useState } from 'react';
import fetchPowerRatings from '@/lib/supabase/fetchPowerRatings';

const PowerRatingsHealthCheck = () => {
  const [ratings, setRatings] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPowerRatings();
      console.log('Power Ratings Health Check:', data);
      setRatings(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading power ratings...</p>;
  if (!ratings || ratings.length === 0) return <p>No power ratings found.</p>;

  return (
    <div>
      <h2>Health Check: Power Ratings</h2>
      <pre>{JSON.stringify(ratings, null, 2)}</pre>
    </div>
  );
};

export default PowerRatingsHealthCheck;