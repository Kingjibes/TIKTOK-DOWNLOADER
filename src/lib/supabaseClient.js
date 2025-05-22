import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oezvtiudkzmgpnxlwigc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lenZ0aXVka3ptZ3BueGx3aWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTU0MDYsImV4cCI6MjA2MzQ3MTQwNn0.x3G4ju8-cZIIUDV4Kgj8DyS9UOG_xUe0iFit0idd7lY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
