import './EntryModal.css'

const DAYS_OF_WEEK = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAYS_OF_WEEK[d.getDay()]} ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`
}

export default function EntryModal({ entry, days, entries, onClose }) {
  const prayer = days[entry - 1]
  const text = entries[entry] || ''

  return (
    <div className="entry-scrim" onClick={onClose}>
      <div className="entry-card" onClick={e => e.stopPropagation()}>
        <div className="entry-header">
          <span className="entry-date">{formatDate(prayer.date)}</span>
          <span className="entry-day">DAY {entry}</span>
        </div>
        <h3 className="entry-topic">{prayer.topic}</h3>
        <div className="entry-rule" />
        <p className="entry-prompt">{prayer.reflectionPrompt}</p>
        {text.trim() ? (
          <p className="entry-text">{text}</p>
        ) : (
          <p className="entry-blank">Left blank that day.</p>
        )}
        <button className="entry-close" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}
