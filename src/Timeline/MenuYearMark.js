import React from 'react'

const MenuYearMark = ({year, eventIndex, isStaged, isInViewPort}) => {
  return (
    <div key={`year-of-${eventIndex}`}
      className={`MenuYearMark item ${isStaged ? '' : 'not-staged'} ${isInViewPort ? 'in-viewport' : ''}`}>
      {year}
    </div>
  )
}

export default React.memo(MenuYearMark)
