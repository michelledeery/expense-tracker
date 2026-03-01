import { useState, useMemo } from 'react'
import { formatAmount } from '../utils/format'
import ExpenseItem from './ExpenseItem'
import './AllExpenses.css'

function getMonthKey(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  const d = new Date(year, month - 1, 1)
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

function getMonthOptions(expenses) {
  const keys = new Set()
  for (const exp of expenses) {
    keys.add(getMonthKey(exp.date))
  }
  return Array.from(keys)
    .sort((a, b) => b.localeCompare(a))
    .map((key) => ({ key, label: getMonthLabel(key) }))
}

function filterByMonth(expenses, monthKey) {
  return expenses.filter((exp) => getMonthKey(exp.date) === monthKey)
}

function AllExpenses({ expenses, currency, onDelete }) {
  const [viewMode, setViewMode] = useState('all') // 'all' | 'monthly'
  const monthOptions = useMemo(() => getMonthOptions(expenses), [expenses])
  const [selectedMonth, setSelectedMonth] = useState('')
  const selectedMonthKey = selectedMonth || (monthOptions[0]?.key ?? '')
  const monthlyExpenses = useMemo(
    () => (viewMode === 'monthly' && selectedMonthKey ? filterByMonth(expenses, selectedMonthKey) : []),
    [expenses, viewMode, selectedMonthKey]
  )
  const monthlyTotal = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0)

  if (expenses.length === 0) {
    return (
      <section className="all-expenses">
        <h2>All expenses</h2>
        <p className="empty-state">No expenses yet.</p>
      </section>
    )
  }

  return (
    <section className="all-expenses">
      <div className="all-expenses-controls" aria-label="View and filter">
          <div className="controls-row">
            <span className="controls-label">View:</span>
            <div className="view-toggle" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'all'}
              className={`view-toggle-btn ${viewMode === 'all' ? 'view-toggle-active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              All
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'monthly'}
              className={`view-toggle-btn ${viewMode === 'monthly' ? 'view-toggle-active' : ''}`}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </button>
            </div>
          </div>
          <div className={`month-dropdown-wrap ${viewMode !== 'monthly' ? 'month-dropdown-disabled' : ''}`}>
            <label htmlFor="month-select" className="month-dropdown-label">
              Month:
            </label>
            <select
              id="month-select"
              className="month-dropdown"
              value={selectedMonthKey}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={viewMode !== 'monthly'}
              aria-label="Select month"
            >
              {monthOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
      </div>

      <h2 className="all-expenses-title">All expenses</h2>

      {viewMode === 'all' ? (
        <ul className="expense-ul">
          {expenses.map((exp) => (
            <ExpenseItem key={exp.id} exp={exp} currency={currency} onDelete={onDelete} />
          ))}
        </ul>
      ) : (
        <div className="monthly-view">
          <div className="monthly-view-header">
            <span className="monthly-view-title">{getMonthLabel(selectedMonthKey)}</span>
            <span className="monthly-view-total">{formatAmount(monthlyTotal, currency)}</span>
          </div>
          <ul className="expense-ul">
            {monthlyExpenses.map((exp) => (
              <ExpenseItem key={exp.id} exp={exp} currency={currency} onDelete={onDelete} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default AllExpenses
