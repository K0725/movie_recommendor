import { createClient } from "@supabase/supabase-js";

const URL = "https://qovdusocqyaqfefascfm.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdmR1c29jcXlhcWZlZmFzY2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyNjE5OTYsImV4cCI6MTk5NjgzNzk5Nn0._5fNHxHURSrPrIwvEWXCXqI2dE9ceBha2MQsEtDXn0k";
const supabase = createClient(URL, API_KEY);

export { supabase };