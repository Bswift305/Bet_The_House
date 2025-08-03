import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

interface EventRow {
  id: number;
  name: string;
  dateIso: string;
}

export default function EventsWidget() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (!mounted) return;
      if (error) {
        console.error(error.message);
        setEvents([]);
      } else {
        const sorted = (data ?? []).sort((a, b) => new Date(a.dateIso).getTime() - new Date(b.dateIso).getTime());
        setEvents(sorted);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="bg-gray-800 p-2 rounded">
              {e.name} — {new Date(e.dateIso).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
