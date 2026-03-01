import { useState, useRef } from 'react'
import './BulkAddExpenses.css'

function getTodayISO() {
  return new Date().toISOString()
}

function parseLine(line, defaultCategory) {
  const trimmed = line.trim()
  if (!trimmed) return null
  const parts = trimmed.split(/[,\t]/).map((p) => p.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const amount = parseFloat(parts[1])
  if (isNaN(amount) || amount <= 0) return null
  const description = parts[0]
  const category = parts.length >= 3 ? parts[2] : defaultCategory
  let date = getTodayISO()
  if (parts.length >= 4 && parts[3]) {
    const d = new Date(parts[3])
    if (!isNaN(d.getTime())) date = d.toISOString()
  }
  return { description, amount, category, date }
}

function parseCSVText(text, defaultCategory) {
  const lines = text.split(/\r?\n/)
  const results = []
  let skipped = 0
  const header = lines[0]?.toLowerCase()
  const isHeader = header && header.includes('description') && header.includes('amount')
  const start = isHeader ? 1 : 0
  for (let i = start; i < lines.length; i++) {
    const row = parseLine(lines[i], defaultCategory)
    if (row) results.push(row)
    else if (lines[i].trim()) skipped++
  }
  return { expenses: results, skipped }
}

function BulkAddExpenses({ onAdd, defaultCategory = 'Other', onClose }) {
  const [pasteText, setPasteText] = useState('')
  const [message, setMessage] = useState(null)
  const fileInputRef = useRef(null)

  const handlePasteSubmit = (e) => {
    e.preventDefault()
    setMessage(null)
    const { expenses, skipped } = parseCSVText(pasteText, defaultCategory)
    if (expenses.length === 0) {
      setMessage('No valid expenses found. Use format: description, amount  or  description, amount, category')
      return
    }
    expenses.forEach((exp) => onAdd(exp))
    setPasteText('')
    setMessage(`Added ${expenses.length} expense${expenses.length !== 1 ? 's' : ''}${skipped > 0 ? `, ${skipped} line(s) skipped` : ''}.`)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMessage(null)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result
      if (!text) return
      const { expenses, skipped } = parseCSVText(text, defaultCategory)
      if (expenses.length === 0) {
        setMessage('No valid expenses in file. CSV should have: description, amount  or  description, amount, category')
        return
      }
      expenses.forEach((exp) => onAdd(exp))
      setMessage(`Added ${expenses.length} expense${expenses.length !== 1 ? 's' : ''} from file${skipped > 0 ? `, ${skipped} line(s) skipped` : ''}.`)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <section className="bulk-add">
      <div className="bulk-add-header">
        <h2>Bulk add expenses</h2>
        {onClose && (
          <button type="button" className="bulk-add-close" onClick={onClose} aria-label="Close">
            Hide
          </button>
        )}
      </div>
      <p className="bulk-add-hint">
        Paste below (one per line) or upload a CSV. Format: <strong>description, amount</strong> or <strong>description, amount, category</strong>
      </p>
      <form onSubmit={handlePasteSubmit} className="bulk-add-form">
        <textarea
          className="bulk-add-textarea"
          placeholder="e.g.&#10;Coffee, 4.50&#10;Lunch, 12.00, Food &amp; Dining&#10;Bus fare, 2.50"
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          rows={4}
          aria-label="Paste expenses"
        />
        <div className="bulk-add-actions">
          <button type="submit" className="btn btn-primary" disabled={!pasteText.trim()}>
            Add pasted
          </button>
          <label className="btn btn-secondary">
            Upload CSV
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileChange}
              className="bulk-add-file-input"
              aria-label="Upload CSV file"
            />
          </label>
        </div>
      </form>
      {message && <p className="bulk-add-message">{message}</p>}
    </section>
  )
}

export default BulkAddExpenses
