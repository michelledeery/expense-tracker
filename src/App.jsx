import { useState, useEffect } from 'react'
import './App.css'
import TabSwitcher from './components/TabSwitcher'
import CurrencySelect from './components/CurrencySelect'
import AddExpense from './components/AddExpense'
import BulkAddExpenses from './components/BulkAddExpenses'
import ExpenseList from './components/ExpenseList'
import AllExpenses from './components/AllExpenses'
import Summary from './components/Summary'
import { loadAll, saveAll, CURRENCIES } from './utils/storage'

const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Health',
  'Travel',
  'Other',
]

function App() {
  const [data, setData] = useState(() => loadAll())
  const [activeTab, setActiveTab] = useState('personal')
  const [showBulkAdd, setShowBulkAdd] = useState(false)

  const expenses = data[activeTab]
  const currency = data.currency || 'USD'
  const categories = [...DEFAULT_CATEGORIES, ...(data.customCategories || [])]

  const addCategory = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const existing = [...DEFAULT_CATEGORIES, ...(data.customCategories || [])]
    if (existing.some((c) => c.toLowerCase() === trimmed.toLowerCase())) return
    setData((prev) => ({
      ...prev,
      customCategories: [...(prev.customCategories || []), trimmed],
    }))
  }

  useEffect(() => {
    saveAll(data)
  }, [data])

  const addExpense = (expense) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: [
        { ...expense, id: crypto.randomUUID(), date: expense.date ? new Date(expense.date).toISOString() : new Date().toISOString() },
        ...prev[activeTab],
      ],
    }))
  }

  const deleteExpense = (id) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((e) => e.id !== id),
    }))
  }

  const setCurrency = (newCurrency) => {
    setData((prev) => ({ ...prev, currency: newCurrency }))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p className="tagline">Track spending. Stay in control.</p>
        <TabSwitcher active={activeTab} onChange={setActiveTab} />
        <CurrencySelect value={currency} options={CURRENCIES} onChange={setCurrency} />
      </header>

      <main className="main">
        <Summary expenses={expenses} currency={currency} />
        <AddExpense categories={categories} onAdd={addExpense} onAddCategory={addCategory} />
        {!showBulkAdd ? (
          <button
            type="button"
            className="bulk-add-toggle-btn"
            onClick={() => setShowBulkAdd(true)}
          >
            Bulk add expenses
          </button>
        ) : (
          <BulkAddExpenses
            onAdd={addExpense}
            defaultCategory={categories[0] || 'Other'}
            onClose={() => setShowBulkAdd(false)}
          />
        )}
        <ExpenseList expenses={expenses} onDelete={deleteExpense} currency={currency} />
        <AllExpenses expenses={expenses} currency={currency} onDelete={deleteExpense} />
      </main>
    </div>
  )
}

export default App
