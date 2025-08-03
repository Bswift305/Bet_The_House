import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface PBPRow {
  play_id: number;
  game_id: string;
  description: string;
}

export default function PBP2024Widget() {
  const [plays, setPlays] = useState<PBPRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('pbp_2024').select('*');
      if (!mounted) return;
      if (error) {
        console.error(error.message);
        setPlays([]);
      } else {
        setPlays(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Play-by-Play 2024</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {plays.map((p) => (
            <li key={p.play_id} className="bg-gray-800 p-2 rounded">
              <strong>Game {p.game_id}</strong>: {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}