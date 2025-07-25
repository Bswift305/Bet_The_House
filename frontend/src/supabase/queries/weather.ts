import { supabase } from '../client';

export async function fetchWeather() {
  const { data, error } = await supabase
    .from('weather')
    .select('*');

  if (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }

  return data;
}

