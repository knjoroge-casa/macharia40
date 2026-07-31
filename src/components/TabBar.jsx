import './TabBar.css'

const TABS = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'prayer',   label: 'Prayer'   },
  { id: 'reflections', label: 'Reflections' },
  { id: 'oldLove', label: 'Old Love'  },
]

export default function TabBar({ tab, onTab }) {
  return (
    <nav className="tabbar">
      <div className="tabbar-hairline" />
      <div className="tabbar-inner">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tabbar-item ${tab === t.id ? 'tabbar-item--active' : ''}`}
            onClick={() => onTab(t.id)}
          >
            <span className="tabbar-label">{t.label}</span>
            {tab === t.id && <div className="tabbar-diamond" />}
          </button>
        ))}
      </div>
    </nav>
  )
}
