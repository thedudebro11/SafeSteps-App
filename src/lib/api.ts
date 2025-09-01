import { API_BASE_URL } from './env';
import { supabase } from './supabase';
import { PendingPoint, getPending, setPending } from './storage';

async function authHeader() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Not authenticated');
  return { Authorization: `Bearer ${token}` };
}

export async function ingestBatch(device_id: string, points: PendingPoint[]) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/locations/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ device_id, points }),
  });
  if (!res.ok) throw new Error(`Ingest failed: ${res.status}`);
  return res.json();
}

export async function flushQueue(device_id: string) {
  const queue = getPending();
  if (queue.length === 0) return;
  const chunks: PendingPoint[][] = [];
  for (let i = 0; i < queue.length; i += 50) chunks.push(queue.slice(i, i + 50));
  for (const chunk of chunks) await ingestBatch(device_id, chunk);
  setPending([]);
}

export async function startEmergency(note?: string, severity: 'low'|'high'='high') {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/emergency/start`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ note, severity }),
  });
  if (!res.ok) throw new Error('Emergency start failed'); return res.json();
}

export async function stopEmergency() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/emergency/stop`, { method: 'POST', headers });
  if (!res.ok) throw new Error('Emergency stop failed'); return res.json();
}

export async function meLimits() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/me/limits`, { headers });
  if (!res.ok) throw new Error('limits failed'); return res.json();
}

export async function listFamily() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/family/groups/me`, { headers });
  if (!res.ok) throw new Error('family fetch failed'); return res.json();
}

export async function createInvite() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/family/invitations`, { method: 'POST', headers });
  if (!res.ok) throw new Error('invite failed'); return res.json();
}

export async function acceptInvite(code: string) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/family/invitations/${code}/accept`, { method: 'POST', headers });
  if (!res.ok) throw new Error('accept invite failed'); return res.json();
}

export async function createShareLink(payload: {
  scope: 'history'|'live', expires_at: string,
  time_window_start?: string, time_window_end?: string, mask_precision_meters?: number
}) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/share-links`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('share link create failed'); return res.json();
}

export async function listShareLinks() {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/share-links`, { headers });
  if (!res.ok) throw new Error('share link list failed'); return res.json();
}

export async function revokeShareLink(id: string) {
  const headers = await authHeader();
  const res = await fetch(`${API_BASE_URL}/api/share-links/${id}/revoke`, { method: 'POST', headers });
  if (!res.ok) throw new Error('share link revoke failed'); return res.json();
}
