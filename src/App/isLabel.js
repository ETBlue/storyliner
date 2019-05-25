import {LABELS} from '../_shared'

export default (field) => {
  for (const label of LABELS) {
    if (field.includes(label) && !field.includes('_prep')) {
      return true
    }
  }
  return false
}
