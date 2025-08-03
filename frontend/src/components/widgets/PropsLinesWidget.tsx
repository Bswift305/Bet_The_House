import { useEffect, useState } from 'react';
import { fetchPropsLines } from '../../supabase/queries/propLines';

export default function PropsLinesWidget() {
  const [lines, setLines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchPropsLines();
      if (mounted) {
        setLines(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Prop Lines</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {lines.map((row, i) => (
            <li key={i} className="mb-2">
              {row.player_name} ({row.team}): {row.prop_type} - {row.line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}