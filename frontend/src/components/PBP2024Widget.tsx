// src/components/widgets/PBP2024Widget.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface Play {
  id: number;
  game_id: string;
  quarter: number;
  time: string;
  down: number;
  distance: number;
  yard_line: string;
  play_type: string;
  description: string;
}

const PBP2024Widget: React.FC = () => {
  const [plays, setPlays] = useState<Play[]>([]);

  useEffect(() => {
    const fetchPlays = async () => {
      const { data, error } = await supabase
        .from('pbp_2024')
        .select('*')
        .order('id', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching PBP data:', error.message);
      } else {
        setPlays(data || []);
      }
    };

    fetchPlays();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold text-red-500 mb-3">Play-by-Play (2024)</h2>
      <div className="space-y-2 text-sm text-gray-300">
        {plays.map((play) => (
          <div key={play.id} className="border-b border-gray-700 pb-2">
            <div>
              <span className="font-medium">Q{play.quarter}</span> | {play.time} | {play.down}&amp;{play.distance} at {play.yard_line}
            </div>
            <div className="text-gray-400">{play.play_type}</div>
            <div>{play.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PBP2024Widget;
