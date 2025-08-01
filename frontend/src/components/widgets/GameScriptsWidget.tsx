import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'

type Row = {
  game_id: string
  trailing_7_4th: boolean | null
  leading_10_half: boolean | null
}

export default function GameScriptsWidget() {
  const [rows, setRows] = useState<Row[]>([])
  const [gameId, setGameId] = useState<string>('All')
  const [gameIds, setGameIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)

      let q = supabase
        .from('game_scripts')
        .select('game_id,trailing_7_4th,leading_10_half')
        .order('game_id', { ascending: true })
        .limit(500)

      if (gameId !== 'All') q = q.eq('game_id', gameId)

      const { data, error } = await q
      if (!mounted) return
      if (error) setError(error.message)
      else setRows((data ?? []) as Row[])
      setLoading(false)

      const ids = Array.from(new Set((data ?? []).map((r) => r.game_id))).sort()
      setGameIds(['All', ...ids])
    })()
    return () => {
      mounted = false
    }
  }, [gameId])

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-4">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">Game Scripts</h2>
        <label className="text-sm text-gray-300">
          Game
          <select
            className="ml-2 w-56 rounded-md border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-gray-100"
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
      </div>

      {error && <div className="mb-2 text-sm text-red-300">Error: {error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="p-2 text-left">Game</th>
              <th className="p-2 text-left">Trailing ≥7 in 4th</th>
              <th className="p-2 text-left">Leading ≥10 at Half</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={3}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={3}>
                  No rows.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.game_id} className="border-b border-gray-800">
                  <td className="p-2 text-gray-100">{r.game_id}</td>
                  <td className="p-2">{r.trailing_7_4th ? 'Yes' : 'No'}</td>
                  <td className="p-2">{r.leading_10_half ? 'Yes' : 'No'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
