import React from 'react'

import {getFieldGroup} from '../_shared'

import LabelSet from './LabelSet'

const Relation = ({event, labelColor, setFilter}) => {
  const subjectFields = getFieldGroup({event, field: 'subject'})
  const objectFields = getFieldGroup({event, field: 'object'})
  return (
    <p className='Relation'>
      {
        subjectFields.map((field) => <LabelSet key={field} event={event} label={field} size='large' sla='50%, 50%, 0.3'
          labelColor={labelColor} setFilter={setFilter} />)
      }
      {event.action && event.action.length > 0 ? (
        <span>
          {event.action}
        </span>
      ) : null}
      {
        objectFields.map((field) => <LabelSet key={field} event={event} label={field} size='large' sla='50%, 50%, 0.3'
          labelColor={labelColor} setFilter={setFilter} />)
      }
      {event.topic && event.topic.length > 0 ? (
        <span>
          {event.topic}
        </span>
      ) : null}
    </p>
  )
}

export default React.memo(Relation)
