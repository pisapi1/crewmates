import { createClient } from '@supabase/supabase-js'
const URL = `https://jafptroxkrngfpexecgd.supabase.co`
const API_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZnB0cm94a3JuZ2ZwZXhlY2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTczNTQsImV4cCI6MjA2OTU5MzM1NH0.mOuc8YFfs472SUqsucMOiQPWTJ0NRispS8_5CsrnkEA`
export const supabase = createClient(URL, API_KEY)
