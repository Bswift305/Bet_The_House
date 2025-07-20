'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function HomePage() {
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('game_scripts')
      .select('game_id, leading_10_half')
      .eq('trailing_7_4th', true)
      .order('game_id', { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error(error)
        else setGames(data ?? [])
        setLoading(false)
      })
  }, [])

  if (loading) return <p style={{ padding: 20 }}>Loading…</p>
  if (!games.length) return <p style={{ padding: 20 }}>No games found.</p>

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 10 }}>
        Games You Trailed by 7 in Q4
      </h1>
      <ul>
        {games.map((g) => (
          <li key={g.game_id}>
            {g.game_id} —{' '}
            {g.leading_10_half
              ? 'Also led by 10 at half'
              : 'Did not lead by 10 at half'}
          </li>
        ))}
      </ul>
    </div>
  )
}
