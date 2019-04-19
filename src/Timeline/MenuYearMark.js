import React from 'react'

export default ({year, eventIndex, isStaged, isInViewPort}) => {
  return (
    <div key={`year-of-${eventIndex}`}
      className={`MenuYearMark item ${isStaged ? '' : 'not-staged'} ${isInViewPort ? 'in-viewport' : ''}`}>
      {year}
    </div>
  )
}
