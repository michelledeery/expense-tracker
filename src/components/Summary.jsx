import './Summary.css'
import { formatAmount } from '../utils/format'

function Summary({ expenses, currency }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  return (
    <section className="summary">
      <div className="summary-total">
        <span className="summary-label">Total spending</span>
        <span className="summary-value">{formatAmount(total, currency)}</span>
      </div>
      {topCategories.length > 0 && (
        <div className="summary-by-category">
          <span className="summary-label">By category</span>
          <ul className="category-list">
            {topCategories.map(([name, value]) => (
              <li key={name} className="category-item">
                <span className="category-name">{name}</span>
                <span className="category-amount">{formatAmount(value, currency)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Summary
