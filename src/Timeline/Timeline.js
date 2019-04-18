import React from 'react'
import {withRouter} from 'react-router-dom'
import {Sticky} from 'semantic-ui-react'
import moment from 'moment'

import {getEventIndex} from '../_shared'

import isEventListed from './isEventListed'
import isEventInViewPort from './isEventInViewPort'
import isEventStaged from './isEventStaged'
import isFirstEventOfYear from './isFirstEventOfYear'
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
  props.data.forEach((event, eventIndex) => {

    const eventDate = moment(event.date)
    const isStandard = event.date.includes('/') || event.date.includes('-') || event.date.length > 5
    const year = isStandard ? eventDate.year() : event.date
    const month = isStandard ? eventDate.month() + 1 : '?'
    const date = isStandard ? eventDate.date() : '?'
    const time = event.time && event.time.length > 0 ? event.time : null
    const isActive = getEventIndex(props.location.hash) === eventIndex

    if (isEventListed({filter: props.filter, event})) {
      EventList.push(
        <Event key={eventIndex} eventIndex={eventIndex} event={event}
          isActive={isActive} props={props}
          year={year} month={month} date={date} time={time} />
      )
    }

    if (eventIndex === 0) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isStaged={isEventStaged({firstStagedEventID: props.firstStagedEventID, lastStagedEventID: props.lastStagedEventID, eventIndex})}
          year={year} />
      )
    } else if (isFirstEventOfYear({data: props.data, year, eventIndex})) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isStaged={isEventStaged({firstStagedEventID: props.firstStagedEventID, lastStagedEventID: props.lastStagedEventID, eventIndex})}
          year={year} />
      )
    }

    Menu.push(
      <MenuItem key={eventIndex} eventIndex={eventIndex}
        isActive={isActive}
        isInViewPort={isEventInViewPort({visibleEventIDs: props.visibleEventIDs, eventIndex})}
        isStaged={isEventStaged({firstStagedEventID: props.firstStagedEventID, lastStagedEventID: props.lastStagedEventID, eventIndex})}
        month={month} date={date} time={time} />
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
