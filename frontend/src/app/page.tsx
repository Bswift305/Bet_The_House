'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

interface OddsEntry {
  game_id?: string
  timestamp: string
  odds: number
  team_name: string
}

export default function HomePage() {
  const [oddsData, setOddsData] = useState<OddsEntry[]>([])
  const [teamNames, setTeamNames] = useState<string[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Fetch team names on load
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from('odds_history')
        .select('team_name')

      if (error) {
        console.error('Error fetching team names:', error)
        return
      }

      const uniqueTeams: string[] = Array.from(
  new Set(data.map((entry: any) => entry.team_name))
)

setTeamNames(uniqueTeams)
if (uniqueTeams.length > 0) {
  setSelectedTeam(uniqueTeams[0])
}

    }

    fetchTeams()
  }, [])

  // Fetch odds data when selectedTeam changes
  useEffect(() => {
    const fetchOdds = async () => {
      if (!selectedTeam) return

      setLoading(true)

      const { data, error } = await supabase
        .from('odds_history')
        .select('timestamp, odds, team_name')
        .eq('team_name', selectedTeam)
        .order('timestamp', { ascending: true })

      if (error) {
        console.error('Error fetching odds data:', error)
      } else {
        setOddsData(data ?? [])
      }

      setLoading(false)
    }

    fetchOdds()
  }, [selectedTeam])

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 20 }}>Odds Movement</h1>

      {/* Team selection dropdown */}
      <label style={{ fontWeight: 'bold' }}>
        Select Team:{' '}
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          style={{ padding: '6px', marginLeft: 10 }}
        >
          {teamNames.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </label>

      {loading ? (
        <p style={{ marginTop: 20 }}>Loading chart…</p>
      ) : oddsData.length === 0 ? (
        <p style={{ marginTop: 20 }}>No odds data for this team.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={oddsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
            <Line
              type="monotone"
              dataKey="odds"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
