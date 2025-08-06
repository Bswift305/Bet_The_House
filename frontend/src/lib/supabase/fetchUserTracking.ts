// fetchUserTracking.ts
import { supabase } from '../../supabase/client';
import { UserTrackingRow } from '../types/user_tracking';

export async function fetchUserTracking(): Promise<UserTrackingRow[]> {
  const { data, error } = await supabase.from('user_tracking').select('*');
  if (error) {
    console.error('Error fetching user tracking:', error);
    return [];
  }
  return data as UserTrackingRow[];
}

