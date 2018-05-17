import _transactions from './transactions'
export default {
  getTransactionsByRegion (cb, region_id) {
    setTimeout(() => cb(_transactions.filter(item => item.region_id === region_id)), 100)
  }
}
