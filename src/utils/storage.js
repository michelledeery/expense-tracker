const STORAGE_KEY = 'expense-tracker-expenses'

const CURRENCIES = ['USD', 'CAD', 'GBP']

const defaultData = () => ({ personal: [], business: [], currency: 'USD', customCategories: [] })

export function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData()
    const data = JSON.parse(raw)
    return {
      personal: Array.isArray(data.personal) ? data.personal : [],
      business: Array.isArray(data.business) ? data.business : [],
      currency: CURRENCIES.includes(data.currency) ? data.currency : 'USD',
      customCategories: Array.isArray(data.customCategories) ? data.customCategories : [],
    }
  } catch {
    return defaultData()
  }
}

export { CURRENCIES }

export function saveAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save expenses:', e)
  }
}
