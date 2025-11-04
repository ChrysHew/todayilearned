import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
// If not set, these will be undefined and you'll need to add them
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "YOUR_SUPABASE_PROJECT_URL";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_PROJECT_URL" || 
    !supabaseKey || supabaseKey === "YOUR_SUPABASE_ANON_KEY") {
  console.error("⚠️ Supabase credentials not configured. Please check your .env file.");
  console.error("Current URL:", supabaseUrl);
  console.error("Current Key:", supabaseKey ? "Set (length: " + supabaseKey.length + ")" : "Not set");
} else {
  console.log("✅ Supabase connected to:", supabaseUrl);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
  },
});

export default supabase;
