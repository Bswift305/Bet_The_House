import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface GameScriptRow {
  id: string;
  game_id: string;
  description: string;
}

export default function GameScriptsWidget() {
  const [scripts, setScripts] = useState<GameScriptRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('game_scripts').select('*');
      if (!mounted) return;
      if (error) {
        console.error(error.message);
        setScripts([]);
      } else {
        setScripts(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Game Scripts</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {scripts.map((s) => (
            <li key={s.id} className="bg-gray-800 p-2 rounded">
              <strong>Game {s.game_id}</strong>: {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}