import React, {useContext} from 'react'

import {LabelColorContext} from '../_shared'

const LabelSet = ({event, label, setFilter, size, sla}) => {
  const labelColor = useContext(LabelColorContext)
  const set = []
  if (event[`${label}_prep`] && event[`${label}_prep`].length > 0) {
    set.push(
      <span key={`${label}_prep`}>
        {event[`${label}_prep`]}
      </span>
    )
  }
  if (event[label] && event[label].length > 0) {
    set.push(
      <span key={label} className={`ui ${size} horizontal label`}
        style={{backgroundColor: `hsla(${labelColor[event[label]]}, ${sla})`}}
        onClick={() => setFilter(event[label])} >
        {event[label]}
      </span>
    )
  }
  return set
}

export default React.memo(LabelSet)
