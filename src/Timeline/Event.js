import React from 'react'

import renderQuote from './renderQuote'
import isDescriptionAvailable from './isDescriptionAvailable'

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
                {event.content_topic && event.content_topic.length > 0 ? (
                  <span>
                    {event.content_topic}
                  </span>
                ) : null}
              </p>
              {isDescriptionAvailable({event}) ? (
                <p className='description'>
                  {event.via}{event.channel}{event.content_carrier} — <a href={event.ref_url} target='_blank' rel='noopener noreferrer'>
                    {event.ref_title && event.ref_title.length > 0 ? event.ref_title : event.ref_url}
                  </a>
                </p>
              ) : null}
              {event.summary ? (
                <p className='description'>
                  {event.summary}
                </p>
              ) : null}
            </div>
            {renderQuote(event.quote)}
          </div>
        </div>
        {event.note && event.note.length > 0 ? (
          <div className='five wide column'>
            <h4 className='Note-header ui dividing teal header'>
              圍觀筆記
            </h4>
            <p className='Note-content'>
              {event.note}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
