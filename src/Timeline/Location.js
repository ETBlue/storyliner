import React from 'react'

import {getFieldGroup} from '../_shared'

import LabelSet from './LabelSet'

export default ({event, props}) => {
  const locationFields = getFieldGroup({event, field: 'location'})
  return (
    <p className='Locaiton description'>
      {
        locationFields.map((field) => <LabelSet key={field} event={event} label={field} size='small' sla='20%, 70%, 0.3' props={props} />)
      }
    </p>
  )
}
