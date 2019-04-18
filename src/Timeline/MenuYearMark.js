import React from 'react'

export default ({year, eventIndex, isStaged}) => {
  return (
    <div key={`year-of-${eventIndex}`}
      className={`MenuYearMark item ${isStaged ? '' : 'not-staged'} `}>
      {year}
    </div>
  )
}
