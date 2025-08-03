import { useEffect, useState } from 'react';
import { fetchUserTracking } from '../../supabase/queries/UserTracking';

export default function UserTrackingWidget() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchUserTracking();
      if (mounted) {
        setLogs(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">User Tracking</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {logs.map((row, i) => (
            <li key={i} className="mb-2">
              [{new Date(row.timestamp).toLocaleString()}] {row.user_id} - {row.action}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
