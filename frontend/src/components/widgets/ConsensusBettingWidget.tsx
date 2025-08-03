import { useEffect, useState } from 'react';
import { fetchConsensusBetting } from '../../supabase/queries/consensusBetting';
import { ConsensusBettingRow } from '../../types/consensus_betting';

export default function ConsensusBettingWidget() {
  const [data, setData] = useState<ConsensusBettingRow[]>([]);

  useEffect(() => {
    fetchConsensusBetting().then(setData);
  }, []);

  return (
    <div>
      <h2>Consensus Betting</h2>
      <ul>
        {data.map((row) => (
          <li key={row.id}>{row.team} - {row.consensus_pct}%</li>
        ))}
      </ul>
    </div>
  );
}

