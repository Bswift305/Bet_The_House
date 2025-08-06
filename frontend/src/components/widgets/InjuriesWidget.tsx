import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { InjuryRow } from '../../lib/types/injuries';

export default function InjuriesWidget() {
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('injuries').select('*');
      if (!error && data) setInjuries(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Injuries</h2>
      {injuries.map((i, idx) => (
        <div key={idx}>
          <div className="text-sm font-medium">
            {i.player} ({i.team})
          </div>
          <div className="text-xs text-gray-500">Reported: {i.report_date}</div>
        </div>
      ))}
    </div>
  );
}