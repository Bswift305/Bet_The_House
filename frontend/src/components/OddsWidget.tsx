// OddsWidget.tsx

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import io from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// --- Types ---
export type LineType = 'moneyline' | 'spread' | 'total';

export interface TeamOdds {
  teamId: string;
  name: string;
  odds: number;
  lineType: LineType;
  updated: string; // ISO timestamp
}

export type MarketType = 'spread' | 'total' | 'moneyline';

export interface MarketOdds {
  marketId: string;
  marketType: MarketType;
  odds: {
    home: number;
    away: number;
  };
  line: number;
}

export interface LiveOdds {
  eventId: string;
  sport: string;
  league: string;
  teams: TeamOdds[];
  markets: MarketOdds[];
  timestamp: string;
}

// --- Data Fetcher ---
const fetchLiveOdds = async (): Promise<LiveOdds[]> => {
  const { data } = await axios.get<LiveOdds[]>('http://localhost:3001/api/odds/live');
  return data;
};

// --- WebSocket Setup ---
const socket = io('http://localhost:3001');

// --- Component ---
const OddsWidget: React.FC = () => {
  const { data: events, isLoading, error } = useQuery<LiveOdds[]>('liveOdds', fetchLiveOdds, {
    refetchInterval: 10000,
  });

  const [oddsMovement, setOddsMovement] = useState<{ time: string; odds: number }[]>([]);

useEffect(() => {
  socket.on('oddsUpdate', (data) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOddsMovement((prev) => [...prev.slice(-5), { time: timestamp, odds: data.odds }]); // Keep only last 6 points
  });

  return () => {
    socket.off('oddsUpdate');
  };
}, []);

  if (isLoading) return <div className="p-4">Loading odds...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading odds.</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">Live Betting Odds</h2>

      {events?.map((event) => (
        <div
          key={event.eventId}
          className="border rounded-xl p-4 bg-white shadow-md space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {event.sport} – {event.league}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(event.timestamp).toLocaleTimeString()}
            </div>
          </div>

          {/* Team Odds */}
          <div className="space-y-1">
            {event.teams.map((team) => (
              <div key={team.teamId} className="flex justify-between">
                <span>{team.name}</span>
                <span className="font-medium">{team.odds}</span>
              </div>
            ))}
          </div>

          {/* Market Details */}
          <div className="space-y-3">
            {event.markets.map((market) => (
              <div key={market.marketId} className="border-t pt-2">
                {market.marketType === 'total' && (
                  <>
                    <div className="font-semibold">Total line: {market.line}</div>
                    <div className="flex justify-between">
                      <span>Over</span>
                      <span className="font-medium">{market.odds.home}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Under</span>
                      <span className="font-medium">{market.odds.away}</span>
                    </div>
                  </>
                )}

                {market.marketType === 'spread' && (
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Spread start: {market.line > 0 ? `+${market.line}` : market.line}
                    </span>
                    <span className="font-medium">
                      Home {market.odds.home} / Away {market.odds.away}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Odds Trend Chart (mocked for now) */}
          <div className="mt-4">          
            <div className="mt-4">
  <h4 className="text-sm font-semibold mb-1">Odds Movement (Live)</h4>
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={oddsMovement}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="odds"
        stroke="#2563eb"
        strokeWidth={2}
        dot={{ r: 3 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OddsWidget;
