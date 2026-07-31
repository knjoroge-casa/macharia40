import './Calendar.css'

const TOPICS_HYPHEN = {
  'Relationships': 'Relation­ships',
  'Thanksgiving': 'Thanks­giving',
  'Compassion': 'Compas­sion',
  'Resurrection': 'Resur­rection',
}

function hyphenate(topic) {
  return TOPICS_HYPHEN[topic] || topic
}

function PadlockIcon({ color = 'var(--locked-2)', shackleColor = 'var(--locked-2)' }) {
  return (
    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="3.5" width="6" height="4" fill={color} />
      <path d="M1.5 3.5V2.5C1.5 1.4 2.3 0.5 3.5 0.5C4.7 0.5 5.5 1.4 5.5 2.5V3.5" stroke={shackleColor} strokeWidth="1.2" fill="none"/>
    </svg>
  )
}

function MiniRecord() {
  return (
    <div className="cal-mini-record">
      <div className="cal-mini-label">
        <div className="cal-mini-spindle" />
      </div>
    </div>
  )
}

export default function Calendar({ today, days, unlocked, onDayTap, onShowCover }) {
  return (
    <div className="cal-outer">
      <div className="cal-scroll">
        <div className="cal-header">
          <h2 className="cal-title">The Journey</h2>
          <p className="cal-subtitle">1 — 28 AUGUST · 28 MORNINGS</p>
          <div className="cal-hairline" />
        </div>

        <div className="cal-grid">
          {days.map((d, i) => {
            if (d.day === 28) {
              return (
                <div
                  key={d.day}
                  className={`cal-cell cal-cell--wide ${unlocked(d.day) ? (d.day === today ? 'cal-cell--today' : 'cal-cell--past') : 'cal-cell--locked'}`}
                  onClick={() => onDayTap(d.day)}
                >
                  <div className="cal-cell-top">
                    <span className="cal-numeral">28</span>
                    {!unlocked(d.day) && (
                      <div className="cal-cell-lock">
                        <PadlockIcon />
                      </div>
                    )}
                    {d.day === today && unlocked(d.day) && <div className="cal-today-diamond" />}
                  </div>
                  <div className="cal-cell-bottom">
                    <span className="cal-topic-wide">Blessing</span>
                    <span className="cal-topic-forty">FORTY</span>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={d.day}
                className={`cal-cell ${unlocked(d.day) ? (d.day === today ? 'cal-cell--today' : 'cal-cell--past') : 'cal-cell--locked'}`}
                onClick={() => onDayTap(d.day)}
              >
                <div className="cal-cell-top">
                  <span className="cal-numeral">{String(d.day).padStart(2, '0')}</span>
                  {!unlocked(d.day) && (
                    <div className="cal-cell-lock">
                      <PadlockIcon />
                    </div>
                  )}
                  {d.day === today && unlocked(d.day) && <div className="cal-today-diamond" />}
                </div>
                <span className="cal-topic">{hyphenate(d.topic)}</span>
              </div>
            )
          })}
        </div>

        <div className="cal-footer">
          <div className="cal-hairline" />
          <div className="cal-replay" onClick={onShowCover}>
            <MiniRecord />
            <p className="cal-replay-text">Put today's record back on</p>
            <p className="cal-replay-play">PLAY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
