import { useEffect, useState } from 'react';
import { fetchPowerRatings } from '../../supabase/queries/powerRatings';

export default function PowerRatingsWidget() {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchPowerRatings();
      if (mounted) {
        setRatings(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Power Ratings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {ratings.map((row, i) => (
            <li key={i} className="mb-2">
              {row.team}: {row.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}