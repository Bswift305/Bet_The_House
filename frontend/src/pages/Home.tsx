import EventsWidget from '../components/widgets/EventsWidget';
import TeamStatsWidget from '../components/widgets/TeamStatsWidget';
import OddsHistoryWidget from '../components/widgets/OddsHistoryWidget';
import PropsLinesWidget from '../components/widgets/PropsLinesWidget';
import PBP2024Widget from '../components/widgets/PBP2024Widget';
import GameScriptsWidget from '../components/widgets/GameScriptsWidget';

const Home = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <EventsWidget />
      <TeamStatsWidget />
      <OddsHistoryWidget />
      <PropsLinesWidget />
      <PBP2024Widget />
      <GameScriptsWidget />
    </div>
  );
};

export default Home;

