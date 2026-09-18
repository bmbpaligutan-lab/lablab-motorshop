import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const supabaseConfigured = !SUPABASE_URL.includes('YOUR-PROJECT') && !SUPABASE_ANON_KEY.includes('YOUR-SUPABASE');
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export function requireConfig(){ if(!supabaseConfigured) throw new Error('Supabase is not configured. Edit assets/js/config.js with your Project URL and publishable/anon key.'); }
