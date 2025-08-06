import { useEffect, useState } from 'react';
import { fetchUserTracking } from '../../lib/supabase/fetchUserTracking';
import { UserTrackingRow } from '../../lib/types/user_tracking';

export default function UserTrackingWidget() {
  const [logs, setLogs] = useState<UserTrackingRow[]>([]);

  useEffect(() => {
    fetchUserTracking().then(setLogs);
  }, []);

  return (
    <div>
      <h2>User Tracking</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{JSON.stringify(log)}</li>
        ))}
      </ul>
    </div>
  );
}
