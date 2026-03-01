import { formatAmount } from '../utils/format'
import './ExpenseItem.css'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function ExpenseItem({ exp, currency, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-desc">{exp.description}</span>
        <span className="expense-meta">
          {exp.category} · {formatDate(exp.date)}
        </span>
      </div>
      <div className="expense-right">
        <span className="expense-amount">{formatAmount(exp.amount, currency)}</span>
        {onDelete && (
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => onDelete(exp.id)}
            aria-label={`Delete ${exp.description}`}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}

export default ExpenseItem
