// src/pages/Home.tsx (or wherever your Home component lives)
import EventsWidget from '../components/widgets/EventsWidget'
import TeamStatsWidget from '../components/widgets/TeamStatsWidget'
import OddsHistoryWidget from '../components/widgets/OddsHistoryWidget'
import PropsLinesWidget from '../components/widgets/PropsLinesWidget'
import PBP2024Widget from '../components/widgets/PBP2024Widget'
import GameScriptsWidget from '../components/widgets/GameScriptsWidget'

// inside render:
<div className="grid grid-cols-1 gap-6">
  <EventsWidget />

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <TeamStatsWidget />
    <PropsLinesWidget />
  </div>

  <OddsHistoryWidget />

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <PBP2024Widget />
    <GameScriptsWidget />
  </div>
</div>
