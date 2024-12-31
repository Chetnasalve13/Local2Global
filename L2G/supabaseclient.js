import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://qpdsmwexghqapotzqkmy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZHNtd2V4Z2hxYXBvdHpxa215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwNjAzMDQsImV4cCI6MjAyMzYzNjMwNH0.pH_qjG409pm1u3aPHLiIfqJfJx9w_kVfWabRndkKAgo';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase