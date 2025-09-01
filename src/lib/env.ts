import Constants from 'expo-constants';
const extra = Constants.expoConfig?.extra || (Constants as any).manifest?.extra || {};
export const SUPABASE_URL: string = extra.SUPABASE_URL;
export const SUPABASE_ANON_KEY: string = extra.SUPABASE_ANON_KEY;
export const API_BASE_URL: string = extra.API_BASE_URL;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !API_BASE_URL) {
  console.warn('[ENV] Missing SUPABASE_URL / SUPABASE_ANON_KEY / API_BASE_URL in app.json -> expo.extra');
}
