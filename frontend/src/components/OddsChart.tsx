'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type OddsPoint = {
  timestamp: string;
  odds: number;
};

export default function OddsChart({ teamName }: { teamName: string }) {
  const [data, setData] = useState<OddsPoint[]>([]);  

  useEffect(() => {
    async function fetchOdds() {
      const { data, error } = await supabase
        .from('odds_history')
        .select('timestamp, odds')
        .eq('team_name', teamName)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching odds:', error.message);
      } else if (data) {
        setData(data);
      }
    }

    fetchOdds();
  }, [teamName, supabase]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-center mb-4">Odds Over Time</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            />
            <Line type="monotone" dataKey="odds" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
}
