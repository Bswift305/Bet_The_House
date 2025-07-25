import React, { useEffect, useMemo, useState } from 'react'

// 👉 Pick the import that matches where your Supabase client lives.
// If you created `src/supabase/client.ts`, keep the first line and delete the second.
// If you use `src/lib/supabaseClient.ts`, comment the first and uncomment the second.
import { supabase } from '../../supabase/client'
// import { supabase } from '../../lib/supabaseClient'

type TeamRow = {
  team_id?: string | null
  team_name?: string | null
  season?: number | null
  games_played?: number | null
  points_for?: number | null
  points_against?: number | null
  yards_for?: number | null
  yards_against?: number | null
  pass_yards?: number | null
  rush_yards?: number | null
  turnovers?: number | null
  takeaways?: number | null
  win_pct?: number | null
}

type SortKey =
  | 'ppg'
  | 'papg'
  | 'yards_pg'
  | 'yards_allowed_pg'
  | 'win_pct'
  | 'takeaway_diff'

type EnrichedTeam = TeamRow & {
  ppg: number
  papg: number
  yards_pg: number
  yards_allowed_pg: number
  takeaway_diff: number
}

interface Props {
  title?: string
  /** Optional preselected season. If omitted we use the latest season found. */
  defaultSeason?: number
}

const numberOr = (v: unknown, fallback = 0) =>
  typeof v === 'number' && !Number.isNaN(v) ? v : fallback

export default function TeamStatsWidget({ title = 'Team Efficiency', defaultSeason }: Props) {
  const [seasons, setSeasons] = useState<number[]>([])
  const [season, setSeason] = useState<number | undefined>(defaultSeason)
  const [teams, setTeams] = useState<string[]>([])
  const [team, setTeam] = useState<string>('All Teams')
  const [rows, setRows] = useState<TeamRow[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('ppg')
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load seasons list
  useEffect(() => {
    let isMounted = true
    ;(async () => {
      setError(null)
      const { data, error } = await supabase
        .from('team_stats')
        .select('season')
        .not('season', 'is', null)
        .order('season', { ascending: false })

      if (!isMounted) return
      if (error) {
        setError(error.message)
        return
      }

      const uniq = Array.from(
        new Set((data ?? []).map((d) => Number(d.season)).filter((n) => Number.isFinite(n)))
      ) as number[]

      setSeasons(uniq)
      if (!defaultSeason && uniq.length > 0) setSeason(uniq[0])
      else if (defaultSeason) setSeason(defaultSeason)
    })()
    return () => {
      isMounted = false
    }
  }, [defaultSeason])

  // Load team list for the selected season
  useEffect(() => {
    if (!season) return
    let isMounted = true
    ;(async () => {
      setError(null)
      const { data, error } = await supabase
        .from('team_stats')
        .select('team_name')
        .eq('season', season)
        .not('team_name', 'is', null)

      if (!isMounted) return
      if (error) {
        setError(error.message)
        return
      }

      const uniq = Array.from(new Set((data ?? []).map((d) => d.team_name as string))).filter(
        Boolean
      ) as string[]
      uniq.sort((a, b) => a.localeCompare(b))
      setTeams(['All Teams', ...uniq])
      setTeam('All Teams')
    })()
    return () => {
      isMounted = false
    }
  }, [season])

  // Load stat rows
  useEffect(() => {
    if (!season) return
    let isMounted = true
    ;(async () => {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('team_stats')
        .select(
          [
            'team_id',
            'team_name',
            'season',
            'games_played',
            'points_for',
            'points_against',
            'yards_for',
            'yards_against',
            'pass_yards',
            'rush_yards',
            'turnovers',
            'takeaways',
            'win_pct',
          ].join(',')
        )
        .eq('season', season)

      if (team && team !== 'All Teams') {
        query = query.eq('team_name', team)
      }

      const { data, error } = await query

      if (!isMounted) return
      if (error) {
        setError(error.message)
        setRows([])
      } else {
        setRows((data ?? []) as TeamRow[])
      }
      setLoading(false)
    })()
    return () => {
      isMounted = false
    }
  }, [season, team])

  const enriched: EnrichedTeam[] = useMemo(() => {
    return rows.map((r) => {
      const gp = Math.max(1, numberOr(r.games_played, 0)) // avoid divide-by-zero
      const ppg = numberOr(r.points_for) / gp
      const papg = numberOr(r.points_against) / gp
      const yards_pg = numberOr(r.yards_for) / gp
      const yards_allowed_pg = numberOr(r.yards_against) / gp
      const takeaway_diff = numberOr(r.takeaways) - numberOr(r.turnovers)
      return {
        ...r,
        ppg,
        papg,
        yards_pg,
        yards_allowed_pg,
        takeaway_diff,
      }
    })
  }, [rows])

  const sorted = useMemo(() => {
    const copy = [...enriched]
    copy.sort((a, b) => {
      const av = a[sortKey] as number
      const bv = b[sortKey] as number
      const cmp = (av ?? 0) - (bv ?? 0)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [enriched, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-gray-700 bg-gray-900/60 backdrop-blur p-4">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-gray-400">
            Efficiency metrics by team (points per game, yards per game, turnover differential, win
            %).
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm text-gray-300">
            Season
            <select
              className="ml-2 rounded-md border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-gray-100"
              value={season ?? ''}
              onChange={(e) => setSeason(Number(e.target.value))}
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-gray-300">
            Team
            <select
              className="ml-2 w-52 rounded-md border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-gray-100"
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

      {error && (
        <div className="mb-3 rounded-md border border-red-500 bg-red-950/40 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="p-2 text-left">Team</th>
              <SortableTh
                label="PPG"
                active={sortKey === 'ppg'}
                dir={sortDir}
                onClick={() => toggleSort('ppg')}
              />
              <SortableTh
                label="PA / G"
                active={sortKey === 'papg'}
                dir={sortDir}
                onClick={() => toggleSort('papg')}
              />
              <SortableTh
                label="Yds / G"
                active={sortKey === 'yards_pg'}
                dir={sortDir}
                onClick={() => toggleSort('yards_pg')}
              />
              <SortableTh
                label="Yds Allowed / G"
                active={sortKey === 'yards_allowed_pg'}
                dir={sortDir}
                onClick={() => toggleSort('yards_allowed_pg')}
              />
              <SortableTh
                label="TO Diff"
                active={sortKey === 'takeaway_diff'}
                dir={sortDir}
                onClick={() => toggleSort('takeaway_diff')}
              />
              <SortableTh
                label="Win %"
                active={sortKey === 'win_pct'}
                dir={sortDir}
                onClick={() => toggleSort('win_pct')}
              />
              <th className="p-2 text-right text-gray-300">GP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-gray-300" colSpan={9}>
                  Loading…
                </td>
              </tr>
            ) : sorted.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-300" colSpan={9}>
                  No data.
                </td>
              </tr>
            ) : (
              sorted.map((r) => (
                <tr key={`${r.team_id ?? r.team_name}-${r.season}`} className="border-b border-gray-800">
                  <td className="p-2 font-medium text-gray-100">{r.team_name ?? '—'}</td>
                  <TdNum value={r.ppg} />
                  <TdNum value={r.papg} />
                  <TdNum value={r.yards_pg} />
                  <TdNum value={r.yards_allowed_pg} />
                  <TdNum value={r.takeaway_diff} />
                  <TdNum value={numberOr(r.win_pct) * 100} suffix="%" />
                  <TdNum value={numberOr(r.games_played)} decimals={0} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TdNum({
  value,
  decimals = 2,
  suffix = '',
}: {
  value: number
  decimals?: number
  suffix?: string
}) {
  const fmt =
    typeof value === 'number' && Number.isFinite(value)
      ? value.toFixed(decimals)
      : (0).toFixed(decimals)
  return (
    <td className="p-2 text-right tabular-nums text-gray-100">
      {fmt}
      {suffix}
    </td>
  )
}

function SortableTh({
  label,
  active,
  dir,
  onClick,
}: {
  label: string
  active?: boolean
  dir?: 'asc' | 'desc'
  onClick?: () => void
}) {
  return (
    <th
      className={`p-2 text-right ${
        active ? 'text-red-400' : 'text-gray-300 hover:text-gray-200'
      } cursor-pointer select-none`}
      onClick={onClick}
      title="Click to sort"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active ? <span>{dir === 'asc' ? '▲' : '▼'}</span> : null}
      </span>
    </th>
  )
}
