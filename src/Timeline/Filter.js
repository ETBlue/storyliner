import React from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className='Filter ui two column stackable grid'>
      <div className='eleven wide column'>
        <p className='Filter-message'>
          Filtered by
          <span className='ui horizontal label' style={{margin: '0 0.5rem'}} >
            {filter}
            <i className='icon delete'
              onClick={() => setFilter(filter)} />
          </span>
        </p>
      </div>
    </div>
  )
}

export default React.memo(Filter)
