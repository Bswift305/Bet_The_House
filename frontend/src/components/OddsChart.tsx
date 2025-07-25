// src/components/OddsChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { time: '10:00', odds: 1.8 },
  { time: '11:00', odds: 1.75 },
  { time: '12:00', odds: 1.72 },
  { time: '13:00', odds: 1.69 },
  { time: '14:00', odds: 1.73 },
];

export default function OddsChart() {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-4 text-white">
      <h2 className="text-xl font-bold mb-4 text-red-500">Odds Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="odds" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
