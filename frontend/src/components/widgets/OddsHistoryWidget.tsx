import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface OddsRow {
  id: string;
  team_name: string;
  line: number;
  updated_at: string;
}

export default function OddsHistoryWidget() {
  const [data, setData] = useState<OddsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('odds_history').select('*');
      if (!mounted) return;
      if (error) {
        console.error(error.message);
        setData([]);
      } else {
        setData(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Odds History</h2>
      {loading ? <p>Loading...</p> : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="updated_at" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="line" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
