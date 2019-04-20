import React from 'react'
import {withRouter} from 'react-router-dom'
import {Sticky} from 'semantic-ui-react'

import {getEventIndex} from '../_shared'

import isEventListed from './isEventListed'
import isEventInViewPort from './isEventInViewPort'
import isEventStaged from './isEventStaged'
import isFirstEventOfYear from './isFirstEventOfYear'
import getDateTime from './getDateTime'
import Filter from './Filter'
import Event from './Event'
import MenuYearMark from './MenuYearMark'
import MenuItem from './MenuItem'
import './Timeline.css'

const Timeline = (props) => {
  // get ready to set up page body
  const Menu = []
  const EventList = []

  // render relations
  props.events.forEach((event, eventIndex) => {
    if (!event.date) {
      return null
    }

    const dateTime = getDateTime(event)
    const isActive = getEventIndex(props.location.hash) === eventIndex

    if (isEventListed({filter: props.filter, event})) {
      EventList.push(
        <Event key={eventIndex} eventIndex={eventIndex} event={event}
          isActive={isActive} props={props}
          year={dateTime.year} month={dateTime.month} date={dateTime.date} time={dateTime.time} />
      )
    }
    const isStaged = isEventStaged({firstStagedEventIndex: props.firstStagedEventIndex, lastStagedEventIndex: props.lastStagedEventIndex, eventIndex})
    const isInViewPort = isEventInViewPort({visibleEventIDs: props.visibleEventIDs, eventIndex})
    if (eventIndex === 0) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isInViewPort={isInViewPort}
          isStaged={isStaged}
          year={dateTime.year} />
      )
    } else if (isFirstEventOfYear({events: props.events, year: dateTime.year, eventIndex})) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isInViewPort={isInViewPort}
          isStaged={isStaged}
          year={dateTime.year} />
      )
    }

    Menu.push(
      <MenuItem key={eventIndex} eventIndex={eventIndex}
        isActive={isActive}
        isInViewPort={isInViewPort}
        isStaged={isStaged}
        month={dateTime.month} date={dateTime.date} time={dateTime.time} />
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
        {props.filter.length > 0 ? (
          <Filter {...props} />
        ) : null}
        {EventList}
      </div>
    </div>
  )
}

export default withRouter(Timeline)
