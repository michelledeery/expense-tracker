import './CurrencySelect.css'

function CurrencySelect({ value, options, onChange }) {
  return (
    <div className="currency-select-wrap">
      <label htmlFor="currency-select" className="currency-label">
        Currency
      </label>
      <select
        id="currency-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="currency-select"
        aria-label="Select currency"
      >
        {options.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CurrencySelect
