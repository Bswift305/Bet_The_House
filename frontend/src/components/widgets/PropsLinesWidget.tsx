import React, { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../supabase/client'

type Row = {
  id: string
  player_id: string | null // often a team name in your data
  prop: string | null
  line: number | null
  sportsbook: string | null
  fetched_at: string
}

export default function PropsLinesWidget() {
  const [rows, setRows] = useState<Row[]>([])
  const [team, setTeam] = useState<string>('All')
  const [teams, setTeams] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('props_lines')
        .select('id,player_id,prop,line,sportsbook,fetched_at')
        .order('fetched_at', { ascending: false })
        .limit(500)

      if (!mounted) return
      if (error) setError(error.message)
      else setRows((data ?? []) as Row[])
      setLoading(false)

      const uniq = Array.from(
        new Set((data ?? []).map((r) => (r.player_id ?? '').trim()).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b))
      setTeams(['All', ...uniq])
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(
    () => rows.filter((r) => (team === 'All' ? true : (r.player_id ?? '') === team)),
    [rows, team]
  )

  // For each (player_id, prop, sportsbook) keep most recent line
  const latest = useMemo(() => {
    const map = new Map<string, Row>()
    for (const r of filtered) {
      const key = `${r.player_id}|${r.prop}|${r.sportsbook}`
      const prev = map.get(key)
      if (!prev || +new Date(r.fetched_at) > +new Date(prev.fetched_at)) {
        map.set(key, r)
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      (a.player_id ?? '').localeCompare(b.player_id ?? '')
    )
  }, [filtered])

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-4">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">Latest Lines (Props / Spreads)</h2>
        <label className="text-sm text-gray-300">
          Team / Player
          <select
            className="ml-2 w-56 rounded-md border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-gray-100"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
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
              <th className="p-2 text-left">Team / Player</th>
              <th className="p-2 text-left">Prop</th>
              <th className="p-2 text-right">Line</th>
              <th className="p-2 text-left">Sportsbook</th>
              <th className="p-2 text-left">As of</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : latest.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-300" colSpan={5}>
                  No lines found.
                </td>
              </tr>
            ) : (
              latest.map((r) => (
                <tr key={r.id} className="border-b border-gray-800">
                  <td className="p-2 text-gray-100">{r.player_id ?? '—'}</td>
                  <td className="p-2 text-gray-100">{r.prop ?? '—'}</td>
                  <td className="p-2 text-right tabular-nums text-gray-100">{r.line ?? '—'}</td>
                  <td className="p-2 text-gray-300">{r.sportsbook ?? '—'}</td>
                  <td className="p-2 text-gray-300">
                    {new Date(r.fetched_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
