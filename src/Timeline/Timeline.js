import React from 'react'
import {withRouter} from 'react-router-dom'
import {Sticky} from 'semantic-ui-react'

import {getEventIndex} from '../_shared'

import renderQuote from './renderQuote'
import './Timeline.css'

const Timeline = (props) => {
  // get ready to set up page body
  let Menu = []
  let Event = []

  // render relations
  Event = props.data.map((eventData, eventDataIndex) => {

    // render nothing if this relation is filtered out
    if (props.filter.length > 0 && props.filter !== eventData.subject && props.filter !== eventData.object) {
      return null
    }

    // set up status of this relation
    const isActive = getEventIndex(props.location.hash) === eventDataIndex ? 'active' : ''

    // render no timestamp by default
    let Time = null
    let time = null

    // render timestamp if necessary
    if (eventData.time && eventData.time.length > 0) {
      time = eventData.time
      Time = (
        <span className='Time'>
          {eventData.time}
        </span>
      )
    }

    // normalize date
    const dateTime = new Date(eventData.date)
    const year = isNaN(dateTime.getFullYear()) ? '?' : dateTime.getFullYear()
    const month = dateTime.getMonth() >= 0 ? (dateTime.getMonth() + 1) : '?'
    const date = month === '?' ? '?' : dateTime.getDate()

    // setup timestamp for relation block
    const Timestamp = (
      <a className='Timestamp' href={`#${eventDataIndex}`}>
        {year}-{month}-{date} {time}
      </a>
    )

    // set up year mark on top of the first menu item
    if (!props.data[eventDataIndex - 1]) {
      Menu.push(
        <div key={`year-of-${eventDataIndex}`} className='YearMark item'>
          {year}
        </div>
      )

    // set up year mark on top of the first menu item from the same year
    } else {
      const prevDateTime = new Date(props.data[eventDataIndex - 1].date)
      const prevYear = prevDateTime.getFullYear()
      if (year !== prevYear) {
        Menu.push(
          <div key={`year-of-${eventDataIndex}`} className='YearMark item'>
            {year}
          </div>
        )
      }
    }

    // change menu style when correlated relations are in viewport
    let classInViewport = ''
    if (props.visibleEventIDs.has(eventDataIndex.toString())) {
      classInViewport = 'in-viewport'
    }

    // change menu style when correlated relations are unstaged
    let notStaged = ''
    if (eventDataIndex < props.firstStagedEventID || eventDataIndex > props.lastStagedEventID) {
      notStaged = 'not-staged'
    }

    // set up menu item for this relation
    Menu.push(
      <a key={eventDataIndex} href={`#${eventDataIndex}`}
        className={`Menu item ${isActive} ${classInViewport} ${notStaged}`}>
        {`${month}/${date}`}
        {Time}
      </a>
    )

    // render no note by default
    let Note = null

    // render note if necessary
    if (eventData.note && eventData.note.length > 0) {
      Note = (
        <div className='five wide column'>
          <h4 className='Note-header ui dividing teal header'>
            圍觀筆記
          </h4>
          <p className='Note-content'>
            {eventData.note}
          </p>
        </div>
      )
    }

    // render no description by default
    let Description = null

    // render description if necessary
    if (
      (eventData.channel && eventData.channel.length > 0) ||
      (eventData.channel_carrier && eventData.channel_carrier.length > 0)
    ) {
      Description = (
        <p className='description'>
          {eventData.via}{eventData.channel}{eventData.content_carrier} — <a href={eventData.ref_url} target='_blank' rel='noopener noreferrer'>
          {eventData.ref_title && eventData.ref_title.length > 0 ? eventData.ref_title : eventData.ref_url}
          </a>
        </p>
      )
    }

    // produce the relation section
    return (
      <article key={eventDataIndex} id={eventDataIndex} className='Event' >
        <div className='ui two column stackable grid' >
          <div className='eleven wide column'>
            <div className={`Event-block ui segments ${isActive}`}>
              <div className='ui segment'>
                {Timestamp}
                <p>
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.authorColor[eventData.subject]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(eventData.subject)} >
                    {eventData.subject}
                  </span>
                  <span>
                    {eventData.action}
                  </span>
                  <span className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.authorColor[eventData.object]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(eventData.object)} >
                    {eventData.object}
                  </span>
                  <span>
                    {eventData.content_topic}
                  </span>
                </p>
                {Description}
              </div>
              {renderQuote(eventData.quote)}
            </div>
          </div>
          {Note}
        </div>
      </article>
    )
  })

  // render no filter by default
  let Filter = null

  // render filter if necessary
  if (props.filter.length > 0) {
    Filter = (
      <div className='Filter ui two column stackable grid'>
        <div className='eleven wide column'>
          <p className='Filter-message'>
            Filtered by
            <span className='ui horizontal label' style={{margin: '0 0.5rem'}} >
              {props.filter}
              <i className='icon delete'
                onClick={() => props.setFilter(props.filter)} />
            </span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='Body'>
      <div className='Menu-wrapper' ref={props.handleContextRef}>
        <Sticky context={props.contextRef}>
          <nav className='ui vertical fluid secondary mini pointing pink menu'>
            <span className='item' style={{cursor: 'pointer'}}
              onClick={() => props.scrollReset('top')} >
              <i className='icon up chevron' style={{float: 'none', opacity: '0.5'}} />
            </span>
            {Menu}
            <span className='item' style={{cursor: 'pointer'}}
              onClick={() => props.scrollReset('bottom')} >
              <i className='icon down chevron' style={{float: 'none', opacity: '0.5'}} />
            </span>
          </nav>
        </Sticky>
      </div>
      <div className='Event-wrapper'>
        {Filter}
        {Event}
      </div>
    </div>
  )
}

export default withRouter(Timeline)