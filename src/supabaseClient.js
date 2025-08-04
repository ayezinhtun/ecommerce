import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxnmwpqnctlvndhudnho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bm13cHFuY3Rsdm5kaHVkbmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzkwOTEsImV4cCI6MjA2OTYxNTA5MX0.EEVzq074Lj5nfpcB8kjqx30gm7a0KbHCO-O6kYhbK0o';

export const supabase = createClient(supabaseUrl, supabaseKey);
