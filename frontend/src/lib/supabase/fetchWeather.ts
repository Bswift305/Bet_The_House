// fetchWeather.ts
import { supabase } from '../../supabase/client';
import { WeatherRow } from '../types/weather';

export async function fetchWeather(): Promise<WeatherRow[]> {
  const { data, error } = await supabase.from('weather').select('*');
  if (error) {
    console.error('Error fetching weather:', error);
    return [];
  }
  return data as WeatherRow[];
}

