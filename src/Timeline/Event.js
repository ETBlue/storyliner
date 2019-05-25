import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

import Relation from './Relation'
import Location from './Location'
import QuoteList from './QuoteList'
import isMediaAvailable from './isMediaAvailable'
import isLocationAvailable from './isLocationAvailable'
import getRefMsg from './getRefMsg'

const Event = ({event, eventIndex, isActive, props, refEventIndex, refEvent, refEventTitle}) => {
  const isQuoteExists = event.quote && event.quote.length > 0
  const isEventReferenced = refEventIndex === eventIndex
  const queries = Object.assign({}, props.queries)
  if (isEventReferenced) {
    delete queries.ref
  } else {
    queries.ref = eventIndex.toString()
  }
  const refMeUrl = `${props.location.pathname}?${queryString.stringify(queries)}${props.location.hash}`
  return (
    <article key={eventIndex} id={eventIndex} className='Event' >
      <div className='ui two column stackable grid' >
        <div className='eleven wide column'>
          {refEvent && !isEventReferenced ? (
            <div className='reference'>
              <div className='text'>
                {getRefMsg({event, refEvent, refEventTitle})}
              </div>
            </div>
          ) : null}
          <div className={`Event-block ui segments ${isActive ? 'active' : ''}`}>
            <div className='ui segment'>
              <a className='Timestamp' href={`#${eventIndex}`}>
                {event.year}-{event.month}-{event.date} {event.time || null}
              </a>
              <Link to={refMeUrl} className='RefMeButton ui basic mini icon button'>
                <i className={`${isEventReferenced ? 'teal' : ''} icon thumbtack`} />
              </Link>
              <div className='Content'>
                {event.image_url ? (
                  <div className='Content-image'>
                    <a href={event.image_url} target='_blank' rel='noopener noreferrer' className='ui small bordered rounded image'>
                      <img src={event.image_url} alt={event.image_alt} />
                    </a>
                  </div>
                ) : null}
                <div className='Content-text'>
                  <Relation event={event} labelColor={props.labelColor} setFilter={props.setFilter} />
                  {event.description ? (
                    <p className='description'>
                      {event.description}
                    </p>
                  ) : null}
                  {isLocationAvailable({event}) ? (
                    <Location event={event} labelColor={props.labelColor} setFilter={props.setFilter} />
                  ) : null}
                  {isMediaAvailable({event}) ? (
                    <p className='description'>
                      {event.channel_prep}{event.channel}{event.content_carrier} — <a href={event.ref_url} target='_blank' rel='noopener noreferrer'>
                        {event.ref_title && event.ref_title.length > 0 ? event.ref_title : event.ref_url}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {isQuoteExists ? (
              <QuoteList quotes={event.quote} />
            ) : null}
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

export default React.memo(Event)
