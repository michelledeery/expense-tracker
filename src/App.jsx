import { useState, useEffect } from 'react'
import './App.css'
import TabSwitcher from './components/TabSwitcher'
import CurrencySelect from './components/CurrencySelect'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import AllExpenses from './components/AllExpenses'
import Summary from './components/Summary'
import { loadAll, saveAll, CURRENCIES } from './utils/storage'

const CATEGORIES = [
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

  const expenses = data[activeTab]
  const currency = data.currency || 'USD'

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
        <AddExpense categories={CATEGORIES} onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} currency={currency} />
        <AllExpenses expenses={expenses} currency={currency} onDelete={deleteExpense} />
      </main>
    </div>
  )
}

export default App
