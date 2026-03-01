import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'

function ExpenseList({ expenses, onDelete, currency }) {
  if (expenses.length === 0) {
    return (
      <section className="expense-list">
        <h2>Recent expenses</h2>
        <p className="empty-state">No expenses yet. Add one above.</p>
      </section>
    )
  }

  return (
    <section className="expense-list">
      <h2>Recent expenses</h2>
      <ul className="expense-ul">
        {expenses.map((exp) => (
          <ExpenseItem key={exp.id} exp={exp} currency={currency} onDelete={onDelete} />
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList
