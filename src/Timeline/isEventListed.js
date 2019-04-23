import {LABELS, getFieldGroup} from '../_shared'

export default ({filter, event}) => {
  if (filter.length === 0) {
    return true
  }

  let allLabels = []
  for (const label of LABELS) {
    const labelFields = getFieldGroup({event, field: label})
    allLabels = allLabels.concat(labelFields)
  }

  for (const label of allLabels) {
    if (filter === event[label]) {
      return true
    }
  }

  return false
}
