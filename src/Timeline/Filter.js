import React, {useContext} from 'react'

import {FilterContext} from '../_shared'

const Filter = () => {
  const {filter, setFilter} = useContext(FilterContext)
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
