import React from 'react'

export default () => (
  <footer className='App-footer' >
  <div className='ui center aligned container'>
    <div className='wrapper'>
      <p>
      Yet another open data experiment by ETBlue.
      <br />
      <a href='https://github.com/ETBlue/storyliner' target='_blank' rel='noopener noreferrer'>
        <i className='icon code' />
        Source code
      </a>
      <a href='https://etblue.github.io/storyliner/?source=https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ukLhLNcPLc20_7J2ju6_e_KSLW2RW0LDu_1_4__IvaVUCO1BhZ9RGwefcWkOVRQ8XjlYv6MSe8oA/pub?output=csv' target='_blank' rel='noopener noreferrer'>
        <i className='icon globe' />
        Sample page
      </a>
      <a href='https://docs.google.com/spreadsheets/d/1w8IAAl2JZhqpmLIxJ8GWNO6KT0CQxM4wCnnIPpGvLPM/edit?usp=sharing' target='_blank' rel='noopener noreferrer'>
        <i className='icon table' />
        Sample data
      </a>
      </p>
    </div>
  </div>
  </footer>
)