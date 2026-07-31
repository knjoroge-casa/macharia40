import './LockedModal.css'

const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_OF_WEEK_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function formatLongDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAYS_OF_WEEK_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`
}

function PadlockIcon() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="20" height="16" fill="var(--locked-2)" />
      <path d="M6 12V8C6 4.7 8.7 2 12 2C15.3 2 18 4.7 18 8V12" stroke="var(--locked-1)" strokeWidth="2.5" fill="none"/>
    </svg>
  )
}

export default function LockedModal({ day, prayer, onClose }) {
  return (
    <div className="locked-scrim" onClick={onClose}>
      <div className="locked-card" onClick={e => e.stopPropagation()}>
        <div className="locked-icon">
          <PadlockIcon />
        </div>
        <p className="locked-day-topic">DAY {day} · {prayer.topic}</p>
        <p className="locked-message">
          This prayer will be waiting for you on {formatLongDate(prayer.date)}.
        </p>
        <button className="locked-close" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}
