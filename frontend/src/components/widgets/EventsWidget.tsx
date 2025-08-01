// src/components/widgets/EventsWidget.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'

type EventRow = {
  id: number
  sport?: string | null
  // Either schema:
  team?: string | null
  opponent?: string | null
  date?: string | null
  location?: string | null
  notes?: string | null
  // Or legacy schema:
  home_team?: string | null
  away_team?: string | null
  start_time?: string | null
}

type UiEvent = {
  id: number
  sport: string
  team: string
  opponent: string
  dateIso: string
  location?: string
  notes?: string
}

export default function EventsWidget() {
  const [events, setEvents] = useState<UiEvent[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setError(null)
      const { data, error } = await supabase
        .from('events')
        .select(
          [
            'id',
            'sport',
            'team',
            'opponent',
            'date',
            'location',
            'notes',
            'home_team',
            'away_team',
            'start_time',
          ].join(',')
        )
        .order('date', { ascending: true }) // if `date` exists this works
        .limit(25)

      if (error) {
        setError(error.message)
        setEvents([])
        return
      }

      const ui = (data ?? []).map((r: EventRow) => {
        const team = (r.team ?? r.home_team ?? '').toString()
        const opponent = (r.opponent ?? r.away_team ?? '').toString()
        const dateIso = (r.date ?? r.start_time ?? new Date().toISOString()).toString()
        return {
          id: r.id,
          sport: (r.sport ?? 'NFL').toString(),
          team,
          opponent,
          dateIso,
          location: r.location ?? undefined,
          notes: r.notes ?? undefined,
        } as UiEvent
      })

      ui.sort((a, b) => +new Date(a.dateIso) - +new Date(b.dateIso))
      setEvents(ui)
    }

    load()
  }, [])

  return (
    <div className="mb-4 rounded-xl bg-gray-800 p-4 shadow-md">
      <h2 className="mb-3 text-xl font-semibold text-red-500">Upcoming Games</h2>

      {error ? (
        <p className="text-sm text-red-300">Error: {error}</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming events.</p>
      ) : (
        <ul className="divide-y divide-gray-700 text-sm text-gray-300">
          {events.map((ev) => (
            <li key={ev.id} className="py-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {ev.team} <span className="text-gray-400">vs.</span> {ev.opponent}
                </span>
                <span className="text-gray-400">
                  {new Date(ev.dateIso).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="text-gray-400">
                {ev.location ? `${ev.location} ` : ''}
                {ev.notes ? `– ${ev.notes}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
