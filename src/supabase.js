import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vcwbqguhtaynngqyzeaz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjd2JxZ3VodGF5bm5ncXl6ZWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NTk3MDgsImV4cCI6MjA0NDMzNTcwOH0.gHXJUCu6b1xLI6VvDFmtrZ9vBdVXZUZJvqm-AHYP1uY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
