import React from 'react'
import settings from '../settings'
import storage from '../component/history'
import location from '../component/location'

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
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    const data = JSON.parse(storage.getItem(key))
    sorted.push({
      key: key,
      title: data.title,
      subtitle: data.subtitle,
      time: data.time
    })
  }
  sorted.sort((a, b) => {
    return b.time - a.time
  })

  const history = sorted.map((item, index) => {

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
    <aside className='App-meta'>
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
      {history}
      </nav>
    </aside>
  )
}
