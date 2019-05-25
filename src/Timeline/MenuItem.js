import React from 'react'

const MenuItem = ({eventIndex, isActive, isInViewPort, isStaged, month, date, time}) => {
  return (
    <a key={eventIndex} href={`#${eventIndex}`}
      className={`MenuItem item ${isActive ? 'active' : ''} ${isInViewPort ? 'in-viewport' : ''} ${isStaged ? '' : 'not-staged'}`}>
      {`${month}/${date}`}
      {time ? (
        <span className='Time'>
          {time}
        </span>
      ) : null}
    </a>
  )
}

export default React.memo(MenuItem)
