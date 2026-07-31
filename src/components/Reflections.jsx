import { useState, useRef, useCallback } from 'react'
import './Reflections.css'

const DAYS_OF_WEEK = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']
const COL_HEADERS = ['M','T','W','T','F','S','S']

function formatDayLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAYS_OF_WEEK[d.getDay()]} ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`
}

export default function Reflections({ today, days, entries, archiveOpen, setArchiveOpen, onSave, onSelectEntry }) {
  const todayPrayer = days[today - 1]
  const [text, setText] = useState(entries[today] || '')
  const timerRef = useRef(null)

  const handleInput = useCallback((e) => {
    const val = e.target.value
    setText(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSave(today, val), 400)
  }, [today, onSave])

  const pastWithEntries = days.filter(d => d.day < today && entries[d.day] && entries[d.day].trim())

  // August 2026: August 1 is a Saturday (day 6 in JS, where 0=Sun)
  // For Mon-Sun layout, Saturday = index 5, so 5 blank cells before day 1
  const leadingBlanks = 5

  function getCellState(dayNum) {
    if (dayNum > today) return 'future'
    if (dayNum === today) return 'today'
    if (entries[dayNum] && entries[dayNum].trim()) return 'written'
    return 'blank'
  }

  return (
    <div className="ref-outer">
      <div className="ref-scroll">
        <div className="ref-header">
          <h2 className="ref-title">Reflections</h2>
          <p className="ref-subtitle">Your words. Just for you.</p>
          <div className="ref-hairline" />
        </div>

        <div className="ref-today-label">TODAY</div>
        <div className="ref-today-date">
          {formatDayLabel(todayPrayer.date)} · {todayPrayer.topic}
        </div>

        <p className="ref-prompt">{todayPrayer.reflectionPrompt}</p>

        <textarea
          className="ref-textarea"
          value={text}
          onChange={handleInput}
          placeholder="Write here…"
          rows={8}
        />

        <div className="ref-archive-wrap">
          <div className="ref-hairline" />
          <button
            className="ref-archive-toggle"
            onClick={() => setArchiveOpen(!archiveOpen)}
          >
            <span className="ref-archive-label">EARLIER · {pastWithEntries.length}</span>
            <svg
              className={`ref-chevron ${archiveOpen ? 'ref-chevron--open' : ''}`}
              width="8" height="8" viewBox="0 0 8 8" fill="none"
            >
              <path d="M2 3L4 5L6 3" stroke="var(--ochre)" strokeWidth="1.2"/>
            </svg>
          </button>
          <div className="ref-hairline" />

          {archiveOpen && (
            <div className="ref-calendar-wrap">
              {pastWithEntries.length === 0 ? (
                <p className="ref-empty">
                  This is the first page. Whatever you write will still be here on the last one.
                </p>
              ) : (
                <div className="ref-cal">
                  <div className="ref-cal-headers">
                    {COL_HEADERS.map((h, i) => (
                      <span key={i} className="ref-cal-col-header">{h}</span>
                    ))}
                  </div>
                  <div className="ref-cal-grid">
                    {Array.from({ length: leadingBlanks }).map((_, i) => (
                      <div key={`blank-${i}`} className="ref-cal-blank" />
                    ))}
                    {days.map(d => {
                      const state = getCellState(d.day)
                      const hasEntry = entries[d.day] && entries[d.day].trim()
                      return (
                        <div
                          key={d.day}
                          className={`ref-cal-cell ref-cal-cell--${state}`}
                          onClick={() => state === 'written' && onSelectEntry(d.day)}
                        >
                          <span className="ref-cal-num">{d.day}</span>
                          {hasEntry && state === 'written' && (
                            <div className="ref-cal-dot" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
