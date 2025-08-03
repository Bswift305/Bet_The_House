import PowerRatingsWidget from '../components/widgets/PowerRatingsWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import PlayerStats from '../components/widgets/PlayerStatsWidget';

export default function NCAA() {
  return (
    <div className="p-4 space-y-4">
      <PowerRatingsWidget />
      <WeatherWidget />
      <PlayerStats />
    </div>
  );
}
