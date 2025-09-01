import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import { ingestBatch, flushQueue } from '../lib/api';
import { pushPending } from '../lib/storage';
import { supabase } from '../lib/supabase';
export const LOCATION_TASK = 'LOCATION_TASK';
export function registerBackgroundTask() {
  // Avoid redefining
  // @ts-ignore
  if (TaskManager._taskManager && TaskManager._taskManager._tasks?.[LOCATION_TASK]) return;
  TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    try {
      if (error) { console.warn('[LOCATION_TASK] error', error); return; }
      const { locations } = (data as any) || {};
      if (!locations || locations.length === 0) return;
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) return;
      const device_id = user.id; // placeholder device id mapping
      const points = locations.map((l: Location.LocationObject) => ({
        device_id,
        ts: new Date(l.timestamp).toISOString(),
        lat: l.coords.latitude,
        lng: l.coords.longitude,
        speed: l.coords.speed ?? undefined,
        heading: l.coords.heading ?? undefined,
        accuracy: l.coords.accuracy ?? undefined,
        is_emergency: false,
      }));
      const net = await Network.getNetworkStateAsync();
      if (!net.isConnected || !net.isInternetReachable) {
        points.forEach(pushPending);
      } else {
        try {
          await ingestBatch(device_id, points);
          await flushQueue(device_id);
        } catch (_e) {
          points.forEach(pushPending);
        }
      }
    } catch (e) { console.warn('[LOCATION_TASK] unexpected', e); }
  });
}
