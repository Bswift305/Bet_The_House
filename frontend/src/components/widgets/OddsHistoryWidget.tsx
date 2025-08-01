import React, { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../supabase/client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

type Row = {
  id: string
  team_name: string | null
  timestamp: string
  odds: number | null
}

export default function OddsHistoryWidget() {
  const [rows, setRows] = useState<Row[]>([])
  const [teams, setTeams] = useState<string[]>([])
  const [team, setTeam] = useState<string>('All Teams')
  const [days, setDays] = useState(7)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)

      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

      let q = supabase
        .from('odds_history')
        .select('id,team_name,timestamp,odds')
        .gte('timestamp', since)
        .order('timestamp', { ascending: true })

      if (team !== 'All Teams') q = q.eq('team_name', team)

      const { data, error } = await q
      if (!mounted) return
      if (error) setError(error.message)
      else setRows((data ?? []) as Row[])

      // build team list for the dropdown
      const t = Array.from(new Set((data ?? []).map((r) => r.team_name || ''))).filter(Boolean)
      t.sort((a, b) => a.localeCompare(b))
      setTeams(['All Teams', ...t])

      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [days, team])

  const chartData = useMemo(
    () =>
      rows.map((r) => ({
        time: new Date(r.timestamp).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        team: r.team_name ?? '',
        odds: Number(r.odds ?? 0),
      })),
    [rows]
  )

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-4">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Odds History</h2>
          <p className="text-sm text-gray-400">Line movement across time.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm text-gray-300">
            Lookback
            <select
              className="ml-2 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-gray-100"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              {[1, 3, 7, 14, 30].map((d) => (
                <option key={d} value={d}>
                  {d} day{d > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-gray-300">
            Team
            <select
              className="ml-2 w-48 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-gray-100"
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
      </div>

      {error && <div className="mb-3 text-sm text-red-300">Error: {error}</div>}

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #374151', color: '#E5E7EB' }}
            />
            <Legend />
            <Line type="monotone" dataKey="odds" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {loading && <p className="mt-2 text-sm text-gray-400">Loading…</p>}
    </section>
  )
}
