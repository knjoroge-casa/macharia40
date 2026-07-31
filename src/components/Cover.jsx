import './Cover.css'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export default function Cover({ today, prayer, phase, onReveal }) {
  const isFading = phase === 'fading' || phase === 'turning' || phase === 'done'
  const isTurning = phase === 'turning' || phase === 'done'

  return (
    <div className="cover-scene" onClick={onReveal}>
      <div
        className={`cover-page ${isTurning ? 'cover-turning' : ''}`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="cover-inner">
          <div className="cover-content">
            <p className="cover-eyebrow">TWENTY-EIGHT MORNINGS</p>
            <h1 className="cover-title">
              Truly. Madly.<br />Deeply.
            </h1>

            <div
              className={`cover-record-wrap ${isFading ? 'cover-record-fade' : ''}`}
            >
              <div className="cover-record">
                <div className="cover-label">
                  <p className="cover-label-day">DAY {today}</p>
                  <p className="cover-label-topic">{prayer.topic}</p>
                  <p className="cover-label-date">{formatDate(prayer.date)}</p>
                </div>
                <div className="cover-spindle" />
              </div>
            </div>

            <p className="cover-recipient">for Macharia</p>
          </div>

          <div className={`cover-footer ${isFading ? 'cover-footer-fade' : ''}`}>
            <p className="cover-signature">~ Wangui waku, always.</p>
            <p className="cover-cta">LIFT THE NEEDLE</p>
          </div>
        </div>

        <div className="cover-left-shadow" />
      </div>
    </div>
  )
}
