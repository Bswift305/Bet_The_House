import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { InjuryRow } from '../../lib/types/injuries';

export default function InjuriesWidget() {
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from('injuries')
        .select('*')
        .order('reported_at', { ascending: false });

      if (error) {
        console.error('Error fetching injuries:', error.message);
      } else if (mounted) {
        setInjuries(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Injuries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {injuries.map((i) => (
            <li key={i.id} className="border-b border-gray-700 pb-2">
              <div className="text-sm font-medium">{i.player_name} ({i.position})</div>
              <div className="text-xs text-gray-400">Team: {i.team} | Status: {i.status}</div>
              <div className="text-xs text-gray-500">Reported: {i.reported_at}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}