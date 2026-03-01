import './TabSwitcher.css'

function TabSwitcher({ active, onChange }) {
  return (
    <div className="tab-switcher" role="tablist" aria-label="Expense type">
      <button
        type="button"
        role="tab"
        aria-selected={active === 'personal'}
        className={`tab ${active === 'personal' ? 'tab-active' : ''}`}
        onClick={() => onChange('personal')}
      >
        Personal
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === 'business'}
        className={`tab ${active === 'business' ? 'tab-active' : ''}`}
        onClick={() => onChange('business')}
      >
        Business
      </button>
    </div>
  )
}

export default TabSwitcher
