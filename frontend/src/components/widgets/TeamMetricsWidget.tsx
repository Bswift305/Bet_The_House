// src/components/widgets/TeamMetricsWidget.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface TeamMetric {
  id: number;
  team: string;
  offensive_rating: number;
  defensive_rating: number;
  pace: number;
  updated_at: string;
}

const TeamMetricsWidget: React.FC = () => {
  const [metrics, setMetrics] = useState<TeamMetric[]>([]);

  useEffect(() => {
    const fetchTeamMetrics = async () => {
      const { data, error } = await supabase.from('team_metrics').select('*').order('updated_at', { ascending: false });
      if (error) {
        console.error('Error fetching team metrics:', error.message);
      } else {
        setMetrics(data || []);
      }
    };

    fetchTeamMetrics();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold text-red-500 mb-3">Team Metrics</h2>
      <table className="w-full text-sm text-gray-300">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="text-left py-1">Team</th>
            <th className="text-left py-1">Off. Rating</th>
            <th className="text-left py-1">Def. Rating</th>
            <th className="text-left py-1">Pace</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.id} className="border-b border-gray-700">
              <td className="py-1">{m.team}</td>
              <td className="py-1">{m.offensive_rating}</td>
              <td className="py-1">{m.defensive_rating}</td>
              <td className="py-1">{m.pace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMetricsWidget;
