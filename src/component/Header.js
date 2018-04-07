import React from 'react'

export default ({logo, title, subtitle}) => (
  <header className='App-header'>
    <div className='wrapper ui container' style={{display: 'flex'}} >
      <a href='/storyliner/' style={{flex: 'none'}}>
      <img src={logo} alt="logo" className='ui image App-logo' />
      </a>
      <h1 className="ui header" style={{flexGrow: '1', margin: '0'}} >
          <span className='App-name' >
            {title}
          </span>
          <div className='sub header App-description'>
            {subtitle}
          </div>
      </h1>
      <div style={{flex: 'none'}} >
        <i className='icon bars' style={{margin: '0.7rem 0 0 0', opacity: '0.5', fontSize: '1.5rem'}} />
      </div>
    </div>
  </header>
)