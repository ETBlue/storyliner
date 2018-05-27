import React from 'react'

export default ({onInput, onSubmit, input}) => (
  <section className='Home' >
    <div className='ui fluid action input' >
      <input type='text' placeholder='Your data source here... (.csv file)' onChange={(e) => onInput(e)} value={input} autoFocus />
      <button className='ui teal button' onClick={onSubmit}>Submit</button>
    </div>
    <hr className='ui hidden section divider' />
    <div className='ui center aligned basic segment'>
      <h2 className='ui bottom pointing black label' style={{marginBottom: '2rem'}} >
        Create your own .csv file in 1 minute!
      </h2>
      <hr className='ui hidden fitted divider' />
      <span className='ui horizontal black label'>Step 1</span>
      <h3 className='ui tiny header' style={{margin: '1rem 0'}} >
        Make a copy
        <div className='sub header'>
          of this <a href='https://docs.google.com/spreadsheets/d/1w8IAAl2JZhqpmLIxJ8GWNO6KT0CQxM4wCnnIPpGvLPM/edit?usp=sharing' target='_blank' rel='noopener noreferrer'>Google Spreadsheet</a>
        </div>
      </h3>
      <span className='ui horizontal black label'>Step 2</span>
      <h3 className='ui tiny header' style={{margin: '1rem 0'}} >
        Publish it by clicking
        <div className='sub header'>
          <code className='ui horizontal basic label'>File</code> > <code className='ui horizontal basic label'>Publish to the web...</code>
        </div>
      </h3>
      <span className='ui horizontal black label'>Step 3</span>
      <h3 className='ui tiny header' style={{margin: '1rem 0'}} >
        Select the format of
        <div className='sub header'>
          <code className='ui horizontal basic label'>Comma-seperated values (.csv)</code>
        </div>
      </h3>
      <span className='ui horizontal black label'>Step 4</span>
      <h3 className='ui tiny header' style={{margin: '1rem 0'}} >
        Click the
        <div className='sub header'>
          <code className='ui horizontal basic label'>Publish</code> button
        </div>
      </h3>
      <span className='ui horizontal black label'>Step 5</span>
      <h3 className='ui tiny header' style={{margin: '1rem 0'}} >
        Copy the provided URL
        <div className='sub header'>
          and paste here
        </div>
      </h3>
      <h3 className='ui top pointing black label'>
        And you are done!
      </h3>
    </div>
  </section>
)