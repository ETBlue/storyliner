import React from 'react'

import {getFieldGroup} from '../_shared'

import LabelSet from './LabelSet'

const Location = ({event}) => {
  const locationFields = getFieldGroup({event, field: 'location'})
  return (
    <p className='Location description'>
      {
        locationFields.map((field) => <LabelSet key={field} event={event} label={field} size='small' sla='20%, 70%, 0.3' />)
      }
    </p>
  )
}

export default React.memo(Location)
