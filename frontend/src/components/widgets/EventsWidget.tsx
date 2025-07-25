// src/components/widgets/EventsWidget.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

/** Matches the columns we created in the `events` table */
interface EventRow {
  id: number;
  sport: 'NFL' | 'NCAA';
  team: string;
  opponent: string;
  date: string;          // ISO date‑string stored in Supabase
  location: string;      // e.g. “@ LSU” or “vs. Packers”
  notes: string | null;
}

const EventsWidget: React.FC = () => {
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })   // upcoming first
        .limit(10);

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data ?? []);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h2 className="text-xl font-semibold text-red-500 mb-3">Upcoming Games</h2>

      {events.length === 0 ? (
        <p className="text-gray-400 text-sm">No upcoming events.</p>
      ) : (
        <ul className="divide-y divide-gray-700 text-sm text-gray-300">
          {events.map((ev) => (
            <li key={ev.id} className="py-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {ev.team} <span className="text-gray-400">vs.</span> {ev.opponent}
                </span>
                <span className="text-gray-400">
                  {new Date(ev.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="text-gray-400">
                {ev.location} {ev.notes ? `– ${ev.notes}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsWidget;
 