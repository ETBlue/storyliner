import React from 'react'

import renderQuote from './renderQuote'

export default ({event, eventIndex, isActive, props}) => {
  // render no timestamp by default
  let time = null

  // render timestamp if necessary
  if (event.time && event.time.length > 0) {
    time = event.time
  }
  const dateTime = new Date(event.date)
  const year = isNaN(dateTime.getFullYear()) ? '?' : dateTime.getFullYear()
  const month = dateTime.getMonth() >= 0 ? (dateTime.getMonth() + 1) : '?'
  const date = month === '?' ? '?' : dateTime.getDate()

  // setup timestamp for relation block
  const Timestamp = (
    <a className='Timestamp' href={`#${eventIndex}`}>
      {year}-{month}-{date} {time}
    </a>
  )

  // render no note by default
  let Note = null

  // render note if necessary
  if (event.note && event.note.length > 0) {
    Note = (
      <div className='five wide column'>
        <h4 className='Note-header ui dividing teal header'>
          圍觀筆記
        </h4>
        <p className='Note-content'>
          {event.note}
        </p>
      </div>
    )
  }

  // render no description by default
  let Description = null

  // render description if necessary
  if (
    (event.channel && event.channel.length > 0) ||
    (event.channel_carrier && event.channel_carrier.length > 0)
  ) {
    Description = (
      <p className='description'>
        {event.via}{event.channel}{event.content_carrier} — <a href={event.ref_url} target='_blank' rel='noopener noreferrer'>
        {event.ref_title && event.ref_title.length > 0 ? event.ref_title : event.ref_url}
        </a>
      </p>
    )
  }

  // produce the relation section
  return (
    <article key={eventIndex} id={eventIndex} className='Event' >
      <div className='ui two column stackable grid' >
        <div className='eleven wide column'>
          <div className={`Event-block ui segments ${isActive ? 'active' : ''}`}>
            <div className='ui segment'>
              {Timestamp}
              <p>
                <span className='ui large horizontal label'
                  style={{backgroundColor: `hsla(${props.authorColor[event.subject]}, 50%, 50%, 0.3)`}}
                  onClick={() => props.setFilter(event.subject)} >
                  {event.subject}
                </span>
                <span>
                  {event.action}
                </span>
                <span className='ui large horizontal label'
                  style={{backgroundColor: `hsla(${props.authorColor[event.object]}, 50%, 50%, 0.3)`}}
                  onClick={() => props.setFilter(event.object)} >
                  {event.object}
                </span>
                <span>
                  {event.content_topic}
                </span>
              </p>
              {Description}
            </div>
            {renderQuote(event.quote)}
          </div>
        </div>
        {Note}
      </div>
    </article>
  )

}
