import { useEffect, useState } from 'react';
import { fetchConsensusBetting } from '../../lib/supabase/fetchConsensusBetting';
import { ConsensusBettingRow } from '../../lib/types/consensus_betting';

export default function ConsensusBettingWidget() {
  const [data, setData] = useState<ConsensusBettingRow[]>([]);

  useEffect(() => {
    fetchConsensusBetting().then(setData);
  }, []);

  return (
    <div>
      <h2>Consensus Betting</h2>
      <ul>
        {data.map((row, i) => (
          <li key={i}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}

