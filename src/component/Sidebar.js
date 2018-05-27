import React from 'react'

import settings from '../settings'
import storage from '../function/getStorage'
import location from '../function/getLocation'

export default ({onCurrentClick}) => {

  let attributes = {
    href: settings.baseUrl,
    className: 'item'
  }
  if (location.search === '') {
    attributes = {
      className: 'active item',
      onClick: onCurrentClick,
      style: {cursor: 'default'}
    }
  }

  let sorted = []
  const history = JSON.parse(storage.getItem(settings.title))
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
      href: `${settings.baseUrl}/${settings.query}${item.key}`,
      className: 'item'
    }
    if (location.search === `${settings.query}${item.key}`) {
      attributes = {
        className: 'active item',
        onClick: onCurrentClick,
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
          {settings.title}
        </span>
        <div className='sub header App-description'>
          {settings.subtitle}
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
