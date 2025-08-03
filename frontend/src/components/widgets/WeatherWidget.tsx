import { useEffect, useState } from 'react';
import { fetchWeather } from '../../supabase/queries/weather';

interface WeatherRow {
  id: string;
  game_id: string | null;
  temperature: number | null;
  wind_speed: number | null;
  conditions: string | null;
  updated_at: string | null;
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchWeather().then((data) => {
      if (mounted) {
        setWeatherData(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Weather</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {weatherData.map((row) => (
            <li key={row.id} className="mb-2">
              <p>Game: {row.game_id ?? 'N/A'}</p>
              <p>Temp: {row.temperature ?? '-'}°F | Wind: {row.wind_speed ?? '-'} mph</p>
              <p>Conditions: {row.conditions ?? 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
