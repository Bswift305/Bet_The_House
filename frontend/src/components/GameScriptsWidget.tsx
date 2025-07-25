// src/components/widgets/GameScriptsWidget.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import EventsWidget from './components/widgets/EventsWidget';

interface Script {
  id: number;
  team: string;
  opponent: string;
  week: number;
  quarter: number;
  script_type: string;
  notes: string;
}

const GameScriptsWidget: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    const fetchScripts = async () => {
      const { data, error } = await supabase
        .from('game_scripts')
        .select('*')
        .order('week', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching game scripts:', error.message);
      } else {
        setScripts(data || []);
      }
    };

    fetchScripts();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold text-red-500 mb-3">Game Scripts</h2>
      <div className="space-y-2 text-gray-300 text-sm">
        {scripts.map((script) => (
          <div key={script.id} className="border-b border-gray-700 pb-2">
            <div className="font-medium">
              {script.team} vs. {script.opponent} — Week {script.week}, Q{script.quarter}
            </div>
            <div className="italic text-gray-400">{script.script_type}</div>
            <div>{script.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScriptsWidget;
