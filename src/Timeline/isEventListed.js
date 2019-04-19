import {LABELS} from '../_shared'

export default ({filter, event}) => {
  if (filter.length === 0) {
    return true
  }

  for (const label of LABELS) {
    if (filter === event[label]) {
      return true
    }
  }

  return false
}
