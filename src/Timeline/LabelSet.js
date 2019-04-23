import React from 'react'

export default ({event, label, props, size, sla}) => {
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
        style={{backgroundColor: `hsla(${props.labelColor[event[label]]}, ${sla})`}}
        onClick={() => props.setFilter(event[label])} >
        {event[label]}
      </span>
    )
  }
  return set
}
