import React from 'react';
import OddsWidget from './components/OddsWidget';
import './index.css'; // ensures Tailwind is loaded

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Live Betting Odds</h1>
      <OddsWidget />
    </div>
  );
}

export default App;
