import { useState, useCallback } from 'react'
import Cover from './components/Cover.jsx'
import Prayer from './components/Prayer.jsx'
import Calendar from './components/Calendar.jsx'
import Reflections from './components/Reflections.jsx'
import OldLove from './components/OldLove.jsx'
import TabBar from './components/TabBar.jsx'
import LockedModal from './components/LockedModal.jsx'
import EntryModal from './components/EntryModal.jsx'
import data from '../prayers.json'

function localDateStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getToday() {
  const date = localDateStr()
  if (date < '2026-08-01') return 0
  if (date > '2026-08-28') return 28
  return Math.min(28, Math.floor((new Date(date) - new Date('2026-08-01')) / 86400000) + 1)
}

const today = getToday()

export default function App() {
  const [tab, setTab] = useState('prayer')
  const [day, setDay] = useState(Math.max(1, today))
  const [coverUp, setCoverUp] = useState(true)
  const [coverPhase, setCoverPhase] = useState('idle')
  const [turning, setTurning] = useState(false)
  const [turnDir, setTurnDir] = useState(null)
  const [fromDay, setFromDay] = useState(null)
  const [lockedDay, setLockedDay] = useState(null)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [entries, setEntries] = useState(() =>
    JSON.parse(localStorage.getItem('reflections') || '{}')
  )

  const unlocked = (d) => today > 0 && d <= today

  const navigateToDay = useCallback((newDay, direction) => {
    if (!unlocked(newDay)) {
      setLockedDay(newDay)
      return
    }
    setFromDay(day)
    setTurnDir(direction)
    setTurning(true)
    setTimeout(() => {
      setDay(newDay)
      setTurning(false)
      setFromDay(null)
      setTurnDir(null)
    }, 880)
  }, [day])

  const handleCalendarTap = useCallback((d) => {
    if (!unlocked(d)) {
      setLockedDay(d)
      return
    }
    setTab('prayer')
    setDay(d)
  }, [])

  const handleCoverReveal = useCallback(() => {
    if (coverPhase !== 'idle') return
    setCoverPhase('fading')
    setTimeout(() => {
      setCoverPhase('turning')
      setTimeout(() => {
        setCoverUp(false)
        setCoverPhase('done')
      }, 1150)
    }, 950)
  }, [coverPhase])

  const saveEntry = useCallback((d, text) => {
    const updated = { ...entries, [d]: text }
    setEntries(updated)
    localStorage.setItem('reflections', JSON.stringify(updated))
  }, [entries])

  const handleTabChange = useCallback((newTab) => {
    setTab(newTab)
    if (newTab === 'prayer') setDay(today)
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {coverUp && (
        <Cover
          today={today}
          prayer={data.days[Math.max(1, today) - 1]}
          phase={coverPhase}
          onReveal={handleCoverReveal}
        />
      )}

      {!coverUp && (
        <>
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {tab === 'prayer' && unlocked(day) && (
              <Prayer
                day={day}
                today={today}
                prayer={data.days[day - 1]}
                turning={turning}
                turnDir={turnDir}
                fromDay={fromDay}
                fromPrayer={fromDay ? data.days[fromDay - 1] : null}
                unlocked={unlocked}
                onNavigate={navigateToDay}
              />
            )}
            {tab === 'prayer' && !unlocked(day) && (
              <Calendar
                today={today}
                days={data.days}
                unlocked={unlocked}
                onDayTap={handleCalendarTap}
                onShowCover={() => { setCoverUp(true); setCoverPhase('idle') }}
              />
            )}
            {tab === 'calendar' && (
              <Calendar
                today={today}
                days={data.days}
                unlocked={unlocked}
                onDayTap={handleCalendarTap}
                onShowCover={() => { setCoverUp(true); setCoverPhase('idle') }}
              />
            )}
            {tab === 'reflections' && (
              <Reflections
                today={today}
                days={data.days}
                entries={entries}
                archiveOpen={archiveOpen}
                setArchiveOpen={setArchiveOpen}
                onSave={saveEntry}
                onSelectEntry={setSelectedEntry}
              />
            )}
            {tab === 'oldLove' && <OldLove />}
          </div>

          <TabBar tab={tab} onTab={handleTabChange} />
        </>
      )}

      {lockedDay !== null && (
        <LockedModal
          day={lockedDay}
          prayer={data.days[lockedDay - 1]}
          onClose={() => setLockedDay(null)}
        />
      )}

      {selectedEntry !== null && (
        <EntryModal
          entry={selectedEntry}
          days={data.days}
          entries={entries}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  )
}
