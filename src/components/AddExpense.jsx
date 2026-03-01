import { useState } from 'react'
import './AddExpense.css'

function getTodayStr() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

const ADD_NEW_VALUE = '__add_new_category__'

function AddExpense({ categories, onAdd, onAddCategory }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Other')
  const [date, setDate] = useState(() => getTodayStr())

  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (value === ADD_NEW_VALUE) {
      const name = window.prompt('Enter new category name:')
      if (name && name.trim()) {
        onAddCategory?.(name.trim())
        setCategory(name.trim())
      }
      return
    }
    setCategory(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!description.trim() || isNaN(value) || value <= 0) return
    onAdd({
      description: description.trim(),
      amount: value,
      category,
      date: new Date(date).toISOString(),
    })
    setDescription('')
    setAmount('')
    setCategory(category && categories.includes(category) ? category : categories[0] || 'Other')
    setDate(getTodayStr())
  }

  return (
    <section className="add-expense">
      <h2>Add expense</h2>
      <form onSubmit={handleSubmit} className="add-expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          aria-label="Expense description"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          className="input input-amount"
          aria-label="Expense amount"
        />
        <div className="add-expense-date-wrap">
          <label htmlFor="add-expense-date" className="add-expense-date-label">
            Date
          </label>
          <input
            type="date"
            id="add-expense-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-date"
            aria-label="Expense date"
          />
        </div>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="select"
          aria-label="Expense category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value={ADD_NEW_VALUE}>+ Add new category...</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </section>
  )
}

export default AddExpense
