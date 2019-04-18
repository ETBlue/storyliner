import React from 'react'

import './Header.css'

export default ({logo, title, subtitle, onIconClick, onLogoClick, status}) => {
  let icon = 'redo'
  switch (status) {
    case 'success':
      icon = 'green check'
      break
    case 'loading':
      icon = 'blue spinner'
      break
    case 'invalid':
      icon = ''
      break
    case 'error':
      icon = 'red exclamation triangle'
      break
    default:
      icon = 'redo'
  }
  return (
    <header className='Header'>
      <div className='wrapper ui container' style={{display: 'flex'}} >
        <span style={{flex: 'none'}}>
          <img src={logo} alt="logo" className='ui image App-logo' onClick={onLogoClick}/>
        </span>
        <h1 className="ui header" style={{flexGrow: '1', margin: '0'}} >
          <span className='App-name' >
            {title}
          </span>
          <div className='sub header App-description'>
            {subtitle}
          </div>
        </h1>
        <div style={{flex: 'none'}} >
          { icon === '' ? null : (<i className={`icon ${icon}`} onClick={onIconClick} />)}
        </div>
      </div>
    </header>
  )
}
