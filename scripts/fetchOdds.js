// scripts/fetchOdds.js

import fetch from 'node-fetch'
import { createClient } from '@supabase/supabase-js'

// ─── 1) Supabase client ───────────────────────────────────────────────────────
const SUPABASE_URL     = 'https://yzcclslgceprsnixqxbz.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Y2Nsc2xnY2VwcnNuaXhxeGJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDI0NjAxNSwiZXhwIjoyMDY1ODIyMDE1fQ.x38Dtt8ZNkmCbR1WGLU65RTiG6rjIo1SNzDwrEOLimA'
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ─── 2) OddsAPI key ────────────────────────────────────────────────────────────
const ODDS_API_KEY = '7f5bed2072de05017a68f59d44c67e84'

// ─── 3) Fetch & upsert spreads (free tier) ─────────────────────────────────────
async function fetchAndSaveOdds() {
  // Build the URL for the 'spreads' market
  const url = new URL('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds')
  url.searchParams.set('apiKey',      ODDS_API_KEY)
  url.searchParams.set('regions',     'us')
  url.searchParams.set('markets',     'spreads')
  url.searchParams.set('oddsFormat',  'american')

  // 1) Fetch
  const res  = await fetch(url.toString())
  console.log('► OddsAPI status:', res.status, res.statusText)
  const body = await res.text()
  console.log('► Response snippet:', body.slice(0, 300), '...')

  if (!res.ok) throw new Error(`OddsAPI error: ${res.statusText}`)

  // 2) Parse & flatten
  const games = JSON.parse(body)
  const rows  = games.flatMap(game =>
    game.bookmakers.flatMap(book =>
      book.markets.flatMap(market =>
        market.outcomes.map(o => ({
          id:         `${game.id}_${book.key}_${market.key}_${o.name}`.slice(0, 50),
          player_id:  o.name,
          prop:       market.key,
          line:       o.point,
          sportsbook: book.key,
        }))
      )
    )
  )

  // 3) Deduplicate by `id`
  const uniqueRows = Array.from(
    new Map(rows.map(r => [r.id, r])).values()
  )

  // 4) Upsert into Supabase
  const { error } = await supabase
    .from('props_lines')
    .upsert(uniqueRows, { onConflict: 'id' })

  if (error) {
    console.error('Supabase insert error:', error)
    process.exit(1)
  }

  console.log(`✅ Upserted ${uniqueRows.length} rows into props_lines.`)
}

fetchAndSaveOdds().catch(err => {
  console.error(err)
  process.exit(1)
})
