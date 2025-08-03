import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface TeamMetric {
  id: number;
  team: string;
  metric_name: string;
  value: number;
}

export default function TeamMetricsWidget() {
  const [metrics, setMetrics] = useState<TeamMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('team_metrics').select('*');
      if (error) {
        console.error('Error fetching team metrics:', error.message);
      } else if (mounted && data) {
        setMetrics(data);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Team Metrics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {metrics.map((metric) => (
            <li key={metric.id} className="border-b border-gray-700 py-1">
              {metric.team} - {metric.metric_name}: {metric.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
