import React, { useEffect, useState } from 'react';
import fetchEvents from '@/lib/supabase/fetchEvents';

const EventsWidget = () => {
  const [events, setEvents] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchEvents();
      console.log('Fetched Events:', data);
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (!events || events.length === 0) return <p>No events found.</p>;

  return (
    <div>
      <h2>Events</h2>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  );
};

export default EventsWidget;