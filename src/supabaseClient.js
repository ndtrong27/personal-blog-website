
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spkiclhptkepjjdeonxg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwa2ljbGhwdGtlcGpqZGVvbnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4Mzk2NTQsImV4cCI6MjA4NTQxNTY1NH0.jzpJZVjljFRr-FCh_E-zaI1mLadgJG_edv-rQ1_XUdM'

export const supabase = createClient(supabaseUrl, supabaseKey)
