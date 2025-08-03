import { supabase } from '../client';
import { UserTrackingRow } from '../types/user_tracking';

export async function fetchUserTracking(): Promise<UserTrackingRow[]> {
  const { data, error } = await supabase
    .from('user_tracking')
    .select('*');

  if (error) {
    console.error('Error fetching user tracking data:', error.message);
    return [];
  }

  return (data ?? []) as UserTrackingRow[];
}
