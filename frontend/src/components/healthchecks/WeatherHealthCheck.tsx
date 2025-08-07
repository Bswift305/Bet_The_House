import React, { useEffect, useState } from 'react';
import fetchWeather from '@/lib/supabase/fetchWeather';

const WeatherHealthCheck = () => {
  const [weather, setWeather] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchWeather();
      console.log('Weather Health Check:', data);
      setWeather(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (!weather || weather.length === 0) return <p>No weather data found.</p>;

  return (
    <div>
      <h2>Health Check: Weather</h2>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
};

export default WeatherHealthCheck;