// js/supabase.js

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inisialisasi koneksi ke Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
