import { useRef, useEffect, useState } from 'react'
import './Prayer.css'

const DAYS_OF_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatPrayerDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAYS_OF_WEEK[d.getDay()]} ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`
}

export default function Prayer({ day, today, prayer, turning, turnDir, fromDay, fromPrayer, unlocked, onNavigate }) {
  const scrollRef = useRef(null)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [day])

  function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX)
  }

  function handleTouchEnd(e) {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return
    if (diff > 0 && day < 28) {
      onNavigate(day + 1, 'forward')
    } else if (diff < 0 && day > 1) {
      onNavigate(day - 1, 'back')
    }
    setTouchStart(null)
  }

  const canGoBack = day > 1
  const canGoForward = day < 28

  return (
    <div
      className="prayer-outer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {turning && fromPrayer && (
        <div className={`prayer-leaf prayer-leaf--${turnDir}`}>
          <PrayerContent day={fromDay} prayer={fromPrayer} today={today} />
          <div className={`prayer-leaf-scrim prayer-leaf-scrim--${turnDir}`} />
        </div>
      )}

      <div className="prayer-scroll" ref={scrollRef}>
        <PrayerContent day={day} prayer={prayer} today={today} />
      </div>

      <div className="prayer-nav">
        <button
          className="prayer-nav-btn"
          onClick={() => canGoBack && onNavigate(day - 1, 'back')}
          aria-label="Previous day"
          disabled={!canGoBack}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button
          className="prayer-nav-btn"
          onClick={() => canGoForward && onNavigate(day + 1, 'forward')}
          aria-label="Next day"
          disabled={!canGoForward}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function PrayerContent({ day, prayer, today }) {
  return (
    <div className="prayer-content">
      <div className="prayer-top-row">
        <span className="prayer-day-label">DAY {day}</span>
        <span className="prayer-date-label">{formatPrayerDate(prayer.date)}</span>
      </div>

      <h2 className="prayer-topic">{prayer.topic}</h2>

      <div className="prayer-rule" />

      <div className="prayer-paragraphs">
        {prayer.prayer.map((p, i) => (
          <p key={i} className="prayer-para">{p}</p>
        ))}
      </div>

      {day === 28 && prayer.closingBenediction && (
        <div className="prayer-benediction">
          <p className="prayer-benediction-text">{prayer.closingBenediction}</p>
          <p className="prayer-benediction-sig">~ Wangui waku, always.</p>
        </div>
      )}

      <div className="prayer-thought-block">
        <div className="prayer-diamond-row">
          <div className="prayer-hairline prayer-hairline--half" />
          <div className="prayer-diamond" />
          <div className="prayer-hairline prayer-hairline--half" />
        </div>
        <p className="prayer-thought-label">A THOUGHT TO CARRY</p>
        <p className="prayer-thought-text">{prayer.thought}</p>
        <p className="prayer-thought-source">— {prayer.thoughtSource}</p>
      </div>
    </div>
  )
}
