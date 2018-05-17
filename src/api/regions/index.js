import _regions from './regions'
export default {
  getAll (cb) {
    setTimeout(() => cb(_regions), 100)
  }
}
