// src/pages/HomePage.tsx

import React from 'react';
import OddsChart from '../components/OddsChart';
import TeamMetricsWidget from "@/components/TeamMetricsWidget";

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">🏈 Bet The House: Live Odds & Trends</h1>
        
        <section className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-white">Odds Movement</h2>
          <OddsChart />
        </section>

        {/* Add future sections here (e.g. OddsWidget, Matchups, etc.) */}
      </div>
    </div>
  );
};

export default HomePage;
