export function formatAmount(amount, currency = 'USD') {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  })
  const parts = formatter.formatToParts(amount)
  return parts
    .map((p) => (p.type === 'currency' ? ` ${p.value}` : p.value))
    .join('')
}
