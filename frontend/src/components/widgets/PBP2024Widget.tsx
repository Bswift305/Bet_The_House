import React, { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../supabase/client'

type Row = {
  play_id: number
  game_id: string
  home_team: string | null
  away_team: string | null
  posteam: string | null
  week: number | null
  season_type: string | null
  // add optional columns if you add them later, e.g. play_type, yards_gained, etc.
}

export default function PBP2024Widget() {
  const [rows, setRows] = useState<Row[]>([])
  const [gameId, setGameId] = useState<string>('All')
  const [gameIds, setGameIds] = useState<string[]>([])
  const [week, setWeek] = useState<number | 'All'>('All')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)

      let q = supabase
        .from('pbp_2024')
        .select('play_id,game_id,home_team,away_team,posteam,week,season_type')
        .order('play_id', { ascending: true })
        .limit(2000)

      if (gameId !== 'All') q = q.eq('game_id', gameId)
      if (week !== 'All') q = q.eq('week', week)

      const { data, error } = await q
      if (!mounted) return
      if (error) setError(error.message)
      else setRows((data ?? []) as Row[])

      const ids = Array.from(new Set((data ?? []).map((r) => r.game_id))).sort()
      setGameIds(['All', ...ids])

      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [gameId, week])

  const summary = useMemo(() => {
    const plays = rows.length
    const byPosteam = new Map<string, number>()
    for (const r of rows) {
      const k = (r.posteam ?? 'UNK').toString()
      byPosteam.set(k, (byPosteam.get(k) ?? 0) + 1)
    }
    const posteamRows = Array.from(byPosteam.entries())
      .map(([team, count]) => ({ team, count }))
    return { plays, posteamRows }
  }, [rows])

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-4">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 className="text-xl font-semibold text-white">Play‑by‑Play 2024</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm text-gray-300">
            Game
            <select
              className="ml-2 w-56 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-gray-100"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            >
              {gameIds.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-gray-300">
            Week
            <select
              className="ml-2 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-gray-100"
              value={week}
              onChange={(e) =>
                setWeek(e.target.value === 'All' ? 'All' : Number(e.target.value))
              }
            >
              <option value="All">All</option>
              {Array.from(new Set(rows.map((r) => r.week).filter(Boolean))).map((w) => (
                <option key={String(w)} value={String(w)}>
                  {String(w)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {error && <div className="mb-2 text-sm text-red-300">Error: {error}</div>}

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Plays" value={summary.plays} />
        {summary.posteamRows.map((r) => (
          <StatCard key={r.team} label={`Plays – ${r.team}`} value={r.count} />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="p-2 text-left">Play ID</th>
              <th className="p-2 text-left">Game</th>
              <th className="p-2 text-left">Posteam</th>
              <th className="p-2 text-left">Home</th>
              <th className="p-2 text-left">Away</th>
              <th className="p-2 text-left">Week</th>
              <th className="p-2 text-left">Season Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={7}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={7}>
                  No rows.
                </td>
              </tr>
            ) : (
              rows.slice(0, 200).map((r) => (
                <tr key={r.play_id} className="border-b border-gray-800">
                  <td className="p-2 text-gray-100">{r.play_id}</td>
                  <td className="p-2 text-gray-300">{r.game_id}</td>
                  <td className="p-2 text-gray-300">{r.posteam ?? '—'}</td>
                  <td className="p-2 text-gray-300">{r.home_team ?? '—'}</td>
                  <td className="p-2 text-gray-300">{r.away_team ?? '—'}</td>
                  <td className="p-2 text-gray-300">{r.week ?? '—'}</td>
                  <td className="p-2 text-gray-300">{r.season_type ?? '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-3">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-semibold text-white tabular-nums">{value}</div>
    </div>
  )
}
