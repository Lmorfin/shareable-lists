require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_ANON_KEY' with your actual Supabase project credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

// Create the Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
