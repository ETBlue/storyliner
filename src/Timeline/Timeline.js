import React from 'react'
import { Sticky } from 'semantic-ui-react'

import renderQuote from './renderQuote'
import './Timeline.css'

export default (props) => {
  // get ready to set up page body
  let Menu = []
  let Relation = []

  // render relations
  Relation = props.data.map((relationData, relationDataIndex) => {

    // render nothing if this relation is filtered out
    if (props.filter.length > 0 && props.filter !== relationData.subject && props.filter !== relationData.object) {
      return null
    }

    // set up status of this relation
    const isActive = props.scrollToRelation === relationDataIndex ? 'active' : ''

    // render no timestamp by default
    let Time = null
    let time = null

    // render timestamp if necessary
    if (relationData.time && relationData.time.length > 0) {
      time = relationData.time
      Time = (
        <span className='Time'>
          {relationData.time}
        </span>
      )
    }

    // normalize date
    const dateTime = new Date(relationData.date)
    const year = isNaN(dateTime.getFullYear()) ? '?' : dateTime.getFullYear()
    const month = dateTime.getMonth() >= 0 ? (dateTime.getMonth() + 1) : '?'
    const date = month === '?' ? '?' : dateTime.getDate()

    // setup timestamp for relation block
    const Timestamp = (
      <a className='Timestamp' href={`#${relationDataIndex}`}
        onClick={() => props.scrollToRelation(relationDataIndex)} >
        {year}-{month}-{date} {time}
      </a>
    )

    // set up year mark on top of the first menu item
    if (!props.data[relationDataIndex - 1]) {
      Menu.push(
        <div key={`year-of-${relationDataIndex}`} className='YearMark item'>
          {year}
        </div>
      )

    // set up year mark on top of the first menu item from the same year
    } else {
      const prevDateTime = new Date(props.data[relationDataIndex - 1].date)
      const prevYear = prevDateTime.getFullYear()
      if (year !== prevYear) {
        Menu.push(
          <div key={`year-of-${relationDataIndex}`} className='YearMark item'>
            {year}
          </div>
        )
      }
    }

    // change menu style when correlated relations are in viewport
    let classInViewport = ''
    if (props.visibleRelationIDs.has(relationDataIndex.toString())) {
      classInViewport = 'in-viewport'
    }

    // change menu style when correlated relations are unstaged
    let notStaged = ''
    if (relationDataIndex < props.firstStagedRelationID || relationDataIndex > props.lastStagedRelationID) {
      notStaged = 'not-staged'
    }

    // set up menu item for this relation
    Menu.push(
      <a key={relationDataIndex} href={`#${relationDataIndex}`}
        className={`Menu item ${isActive} ${classInViewport} ${notStaged}`}
        onClick={() => props.scrollToRelation(relationDataIndex)} >
        {`${month}/${date}`}
        {Time}
      </a>
    )

    // render no note by default
    let Note = null

    // render note if necessary
    if (relationData.note && relationData.note.length > 0) {
      Note = (
        <div className='five wide column'>
          <h4 className='Note-header ui dividing teal header'>
            圍觀筆記
          </h4>
          <p className='Note-content'>
            {relationData.note}
          </p>
        </div>
      )
    }

    // render no description by default
    let Description = null

    // render description if necessary
    if (
      (relationData.channel && relationData.channel.length > 0) ||
      (relationData.channel_carrier && relationData.channel_carrier.length > 0)
    ) {
      Description = (
        <p className='description'>
          {relationData.via}{relationData.channel}{relationData.content_carrier} — <a href={relationData.ref_url} target='_blank' rel='noopener noreferrer'>
          {relationData.ref_title && relationData.ref_title.length > 0 ? relationData.ref_title : relationData.ref_url}
          </a>
        </p>
      )
    }

    // produce the relation section
    return (
      <article key={relationDataIndex} id={relationDataIndex} className='Relation' >
        <div className='ui two column stackable grid' >
          <div className='eleven wide column'>
            <div className={`Relation-block ui segments ${isActive}`}>
              <div className='ui segment'>
                {Timestamp}
                <p>
                  <a className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.authorColor[relationData.subject]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(relationData.subject)} >
                    {relationData.subject}
                  </a>
                  <span>
                    {relationData.action}
                  </span>
                  <a className='ui large horizontal label'
                    style={{backgroundColor: `hsla(${props.authorColor[relationData.object]}, 50%, 50%, 0.3)`}}
                    onClick={() => props.setFilter(relationData.object)} >
                    {relationData.object}
                  </a>
                  <span>
                    {relationData.content_topic}
                  </span>
                </p>
                {Description}
              </div>
              {renderQuote(relationData.quote)}
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
            <a className='item'
              onClick={() => props.scrollReset('top')} >
              <i className='icon up chevron' style={{float: 'none', opacity: '0.5'}} />
            </a>
            {Menu}
            <a className='item'
              onClick={() => props.scrollReset('bottom')} >
              <i className='icon down chevron' style={{float: 'none', opacity: '0.5'}} />
            </a>
          </nav>
        </Sticky>
      </div>
      <div className='Relation-wrapper'>
        {Filter}
        {Relation}
      </div>
    </div>
  )
}
