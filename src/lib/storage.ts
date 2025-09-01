import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV({ id: 'safesteps' });
export type PendingPoint = {
  device_id: string; ts: string; lat: number; lng: number;
  speed?: number; heading?: number; accuracy?: number; is_emergency?: boolean;
};
const KEY = 'pending_points';
export function getPending(): PendingPoint[] {
  try { const raw = storage.getString(KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
export function setPending(points: PendingPoint[]) { storage.set(KEY, JSON.stringify(points)); }
export function pushPending(p: PendingPoint) {
  const arr = getPending();
  if (!arr.find(x => x.device_id===p.device_id && x.ts===p.ts)) { arr.push(p); setPending(arr); }
}
export function clearPending() { setPending([]); }
