import React from 'react'
import {withRouter} from 'react-router-dom'

import {SETTINGS, storage} from '../_shared'

import './Sidebar.css'

const Sidebar = (props) => {

  let attributes = {
    href: SETTINGS.baseUrl,
    className: 'item'
  }
  if (props.location.search === '') {
    attributes = {
      className: 'active item',
      onClick: props.onCurrentClick,
      style: {cursor: 'default'}
    }
  }

  let sorted = []
  const history = JSON.parse(storage.getItem(SETTINGS.title))
  Object.keys(history).forEach((key, index) => {
    sorted.push({
      key: key,
      title: history[key].title,
      subtitle: history[key].subtitle,
      time: history[key].time
    })
  })
  sorted.sort((a, b) => {
    return b.time - a.time
  })

  const historyJSX = sorted.map((item, index) => {

    let attributes = {
      href: `${SETTINGS.baseUrl}/${SETTINGS.query}${item.key}`,
      className: 'item'
    }
    if (props.location.search === `${SETTINGS.query}${item.key}`) {
      attributes = {
        className: 'active item',
        onClick: props.onCurrentClick,
        style: {cursor: 'default'}
      }
    }

    return (
      <a key={item.key} {...attributes} >
        <span className='ui small header'>
        {item.title}
          <span className='sub header'>
          {item.subtitle}
          </span>
        </span>
      </a>
    )
  })

  return (
    <aside className='Sidebar'>
      <h1 className='ui header'>
        <span className='App-name' >
          {SETTINGS.title}
        </span>
        <div className='sub header App-description'>
          {SETTINGS.subtitle}
        </div>
      </h1>
      <nav className='ui vertical secondary fluid menu' style={{margin: '0'}} >
      <a {...attributes} >
        <i className='icon home' />
        Home
      </a>
      {historyJSX}
      </nav>
    </aside>
  )
}

export default withRouter(Sidebar)
