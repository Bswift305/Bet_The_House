// src/components/widgets/PropsLinesWidget.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface PropsLine {
  id: number;
  player_name: string;
  team: string;
  prop_type: string;
  line: number;
  sportsbook: string;
  game_date: string;
  updated_at: string;
}

const PropsLinesWidget: React.FC = () => {
  const [propsLines, setPropsLines] = useState<PropsLine[]>([]);

  useEffect(() => {
    const fetchPropsLines = async () => {
      const { data, error } = await supabase
        .from('props_lines')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching props lines:', error.message);
      } else {
        setPropsLines(data || []);
      }
    };

    fetchPropsLines();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold text-red-500 mb-3">Props Lines</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left py-1">Player</th>
              <th className="text-left py-1">Team</th>
              <th className="text-left py-1">Prop</th>
              <th className="text-left py-1">Line</th>
              <th className="text-left py-1">Book</th>
              <th className="text-left py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {propsLines.map((line) => (
              <tr key={line.id} className="border-b border-gray-700">
                <td className="py-1">{line.player_name}</td>
                <td className="py-1">{line.team}</td>
                <td className="py-1">{line.prop_type}</td>
                <td className="py-1">{line.line}</td>
                <td className="py-1">{line.sportsbook}</td>
                <td className="py-1">{new Date(line.game_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsLinesWidget;
