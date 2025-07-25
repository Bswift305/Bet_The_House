// src/pages/Home.tsx
import React from 'react'
import EventsWidget from '../components/widgets/EventsWidget'
import TeamStatsWidget from '../components/widgets/TeamStatsWidget'

export default function Home() {
  return (
    <div className="space-y-8">
      <EventsWidget />
      <TeamStatsWidget />
    </div>
  )
}
