import React from 'react'

import renderQuote from './renderQuote'
import isDescriptionAvailable from './isDescriptionAvailable'
import isLocationAvailable from './isLocationAvailable'

export default ({event, eventIndex, isActive, props, year, month, date, time}) => {
  return (
    <article key={eventIndex} id={eventIndex} className='Event' >
      <div className='ui two column stackable grid' >
        <div className='eleven wide column'>
          <div className={`Event-block ui segments ${isActive ? 'active' : ''}`}>
            <div className='ui segment'>
              {
                <a className='Timestamp' href={`#${eventIndex}`}>
                  {year}-{month}-{date} {time || null}
                </a>
              }
              <p>
                {event.subject && event.subject.length > 0 ? (
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.labelColor[event.subject]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(event.subject)} >
                    {event.subject}
                  </span>
                ) : null}
                {event.subject_1_prep && event.subject_1_prep.length > 0 ? (
                  <span>
                    {event.subject_1_prep}
                  </span>
                ) : null}
                {event.subject_1 && event.subject_1.length > 0 ? (
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.labelColor[event.subject_1]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(event.subject_1)} >
                    {event.subject_1}
                  </span>
                ) : null}
                {event.action && event.action.length > 0 ? (
                  <span>
                    {event.action}
                  </span>
                ) : null}
                {event.object && event.object.length > 0 ? (
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.labelColor[event.object]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(event.object)} >
                    {event.object}
                  </span>
                ) : null}
                {event.object_1_prep && event.object_1_prep.length > 0 ? (
                  <span>
                    {event.object_1_prep}
                  </span>
                ) : null}
                {event.object_1 && event.object_1.length > 0 ? (
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.labelColor[event.object_1]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(event.object_1)} >
                    {event.object_1}
                  </span>
                ) : null}
                {event.topic && event.topic.length > 0 ? (
                  <span>
                    {event.topic}
                  </span>
                ) : null}
              </p>
              {isLocationAvailable({event}) ? (
                <p className='description'>
                  {event.location_prep && event.location_prep.length > 0 ? (
                    <span>
                      {event.location_prep}
                    </span>
                  ) : null}
                  {event.location && event.location.length > 0 ? (
                    <span className='ui small horizontal label'
                      style={{backgroundColor: `hsla(${props.labelColor[event.location]}, 20%, 70%, 0.3)`}}
                      onClick={() => props.setFilter(event.location)} >
                      {event.location}
                    </span>
                  ) : null}
                  {event.location_1_prep && event.location_1_prep.length > 0 ? (
                    <span>
                      {event.location_1_prep}
                    </span>
                  ) : null}
                  {event.location_1 && event.location_1.length > 0 ? (
                    <span className='ui small horizontal label'
                      style={{backgroundColor: `hsla(${props.labelColor[event.location_1]}, 20%, 70%, 0.3)`}}
                      onClick={() => props.setFilter(event.location_1)} >
                      {event.location_1}
                    </span>
                  ) : null}
                </p>
              ) : null}
              {isDescriptionAvailable({event}) ? (
                <p className='description'>
                  {event.channel_prep}{event.channel}{event.content_carrier} — <a href={event.ref_url} target='_blank' rel='noopener noreferrer'>
                    {event.ref_title && event.ref_title.length > 0 ? event.ref_title : event.ref_url}
                  </a>
                </p>
              ) : null}
              {event.description ? (
                <p className='description'>
                  {event.description}
                </p>
              ) : null}
            </div>
            {renderQuote(event.quote)}
          </div>
        </div>
        {event.note && event.note.length > 0 ? (
          <div className='five wide column'>
            <div className='Note'>
              <div className='ui horizontal fitted divider'>
                <i className='icon coffee' />
              </div>
              <p className='Note-content'>
                {event.note}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}