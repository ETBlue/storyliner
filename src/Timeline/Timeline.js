import React from 'react'
import {withRouter} from 'react-router-dom'
import {Sticky} from 'semantic-ui-react'

import {getEventIndex} from '../_shared'

import isEventListed from './isEventListed'
import Event from './Event'
import Filter from './Filter'
import './Timeline.css'

const Timeline = (props) => {
  // get ready to set up page body
  const Menu = []
  const EventList = []

  // render relations
  props.data.forEach((event, eventIndex) => {
    const isActive = getEventIndex(props.location.hash) === eventIndex

    if (isEventListed({filter: props.filter, event})) {
      EventList.push(
        <Event key={eventIndex} eventIndex={eventIndex} event={event} isActive={isActive} props={props} />
      )
    }

    let Time = null
    if (event.time && event.time.length > 0) {
      Time = (
        <span className='Time'>
          {event.time}
        </span>
      )
    }
    const dateTime = new Date(event.date)
    const year = isNaN(dateTime.getFullYear()) ? '?' : dateTime.getFullYear()
    const month = dateTime.getMonth() >= 0 ? (dateTime.getMonth() + 1) : '?'
    const date = month === '?' ? '?' : dateTime.getDate()

    // set up year mark on top of the first menu item
    if (!props.data[eventIndex - 1]) {
      Menu.push(
        <div key={`year-of-${eventIndex}`} className='YearMark item'>
          {year}
        </div>
      )
    // set up year mark on top of the first menu item from the same year
    } else {
      const prevDateTime = new Date(props.data[eventIndex - 1].date)
      const prevYear = prevDateTime.getFullYear()
      if (year !== prevYear) {
        Menu.push(
          <div key={`year-of-${eventIndex}`} className='YearMark item'>
            {year}
          </div>
        )
      }
    }

    let classInViewport = ''
    if (props.visibleEventIDs.has(eventIndex.toString())) {
      classInViewport = 'in-viewport'
    }
    let notStaged = ''
    if (eventIndex < props.firstStagedEventID || eventIndex > props.lastStagedEventID) {
      notStaged = 'not-staged'
    }
    Menu.push(
      <a key={eventIndex} href={`#${eventIndex}`}
        className={`Menu item ${isActive ? 'active' : ''} ${classInViewport} ${notStaged}`}>
        {`${month}/${date}`}
        {Time}
      </a>
    )
  })

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
        {props.filter.length > 0 ? <Filter {...props} /> : null}
        {EventList}
      </div>
    </div>
  )
}

export default withRouter(Timeline)
