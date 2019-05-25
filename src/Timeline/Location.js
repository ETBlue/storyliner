import React from 'react'

import {getFieldGroup} from '../_shared'

import LabelSet from './LabelSet'

const Location = ({event, labelColor, setFilter}) => {
  const locationFields = getFieldGroup({event, field: 'location'})
  return (
    <p className='Location description'>
      {
        locationFields.map((field) => <LabelSet key={field} event={event} label={field} size='small' sla='20%, 70%, 0.3'
          labelColor={labelColor} setFilter={setFilter} />)
      }
    </p>
  )
}

export default React.memo(Location)
