import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {Sticky} from 'semantic-ui-react'

import {getEventIndex, FilterContext} from '../_shared'

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
  const {filter} = useContext(FilterContext)
  // get ready to set up page body
  const Menu = []
  const EventList = []

  const refEventIndex = parseInt(props.queries.ref, 10)
  const refEvent = !isNaN(refEventIndex) ? props.events[refEventIndex] : null
  const fields = ['subject', 'subject_1_prep', 'subject_1', 'action', 'object', 'object_1_prep', 'object_1', 'topic']
  const refEventTitle = refEvent ? fields.map((field) => refEvent[field]).join('') : null

  // render relations
  props.events.forEach((event, eventIndex) => {
    if (!event.date) {
      return null
    }

    const isActive = getEventIndex(props.location.hash) === eventIndex

    if (isEventListed({filter, event})) {
      EventList.push(
        <Event key={eventIndex} eventIndex={eventIndex} event={event}
          isActive={isActive} props={props}
          refEventIndex={refEventIndex} refEvent={refEvent} refEventTitle={refEventTitle} />
      )
    }
    const isStaged = isEventStaged({firstStagedEventIndex: props.firstStagedEventIndex, lastStagedEventIndex: props.lastStagedEventIndex, eventIndex})
    const isInViewPort = isEventInViewPort({visibleEventIDs: props.visibleEventIDs, eventIndex})
    if (eventIndex === 0) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isInViewPort={isInViewPort}
          isStaged={isStaged}
          year={event.year} />
      )
    } else if (isFirstEventOfYear({events: props.events, eventIndex})) {
      Menu.push(
        <MenuYearMark key={`year-of-${eventIndex}`} eventIndex={eventIndex}
          isInViewPort={isInViewPort}
          isStaged={isStaged}
          year={event.year} />
      )
    }

    Menu.push(
      <MenuItem key={eventIndex} eventIndex={eventIndex}
        isActive={isActive}
        isInViewPort={isInViewPort}
        isStaged={isStaged}
        month={event.month} date={event.date} time={event.time} />
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
        {filter.length > 0 ? (
          <Filter {...props} />
        ) : null}
        {EventList}
      </div>
    </div>
  )
}

export default withRouter(Timeline)
