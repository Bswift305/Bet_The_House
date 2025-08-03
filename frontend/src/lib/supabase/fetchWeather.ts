import { supabase } from '../client';
import { WeatherRow } from '../types/weather';

export async function fetchWeather(): Promise<WeatherRow[]> {
  const { data, error } = await supabase
    .from('weather')
    .select('*')
    .order('game_date', { ascending: false });

  if (error) {
    console.error('Error fetching weather:', error.message);
    return [];
  }

  return (data ?? []) as WeatherRow[];
}
