import React, { Component } from 'react';
import { Rail, Sticky } from 'semantic-ui-react'

import csv2Obj from './function/csv2Obj'
import csv2Title from './function/csv2Title'
import Meta from './component/Meta'
import Header from './component/Header'
import Footer from './component/Footer'
import storage from './component/history'
import location from './component/location'
import settings from './settings'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      isLoaded: false,
      data: [],
      title: '',
      subtitle: '',
      input: decodeURIComponent(location.search.replace('?source=','')),
      source: decodeURIComponent(location.search.replace('?source=','')),
      contextRef: null,
      scroll: parseInt(location.hash.replace('#', ''), 10),
      status: 'standby',
      filter: '',
      showMeta: false
    }

    this.handleContextRef = this.handleContextRef.bind(this)

  }

  resetStatus() {
    window.setTimeout(() => {
      this.setState({status: 'standby'})
    }, 5000)
  }

  toggleMeta() {
    this.setState((prevState, props) => {
      return {showMeta: !prevState.showMeta}
    })
  }

  getData() {

    if (this.state.source.length === 0) {
      this.setState({status: 'invalid', isLoaded: false})
      return
    }

    this.setState({status: 'loading', isLoaded: false}, () => {

      fetch(this.state.source).then((response) => {

        if (response.headers.get('Content-Type') !== 'text/csv') {
          this.setState({status: 'error', isLoaded: false})
          return
        }

        response.text().then(text => {

          const titles = csv2Title(text)
          let allHistory = JSON.parse(storage.getItem(settings.title))
          allHistory[this.state.source] = {
            title: titles.title,
            subtitle: titles.subtitle,
            time: Date.now()
          }
          storage.setItem(settings.title, JSON.stringify(allHistory))

          const parsed = csv2Obj(text)

          this.setState({
            title: titles.title,
            subtitle: titles.subtitle,
            data: parsed.data,
            authorColor: parsed.authorColor,
            isLoaded: true,
            status: 'success'
          }, this.resetStatus())

        })
      })
      .catch(error => {
        this.setState({status: 'error', isLoaded: false})
      })

    })
  }

  onInput(e) {
    this.setState({input: decodeURIComponent(e.target.value)})
  }

  onSubmit() {
    location.assign(`?source=${this.state.input}`)
  }

  scroll(index) {
    this.setState({scroll: index})
  }

  scrollReset(direction) {
    this.setState({scroll: ''})
    window.history.pushState({}, '', location.pathname + location.search)
    if (direction === 'top') {
      window.scrollTo(0, 0)
    } else if (direction === 'bottom') {
      window.scrollTo(0, window.document.body.scrollHeight)
    }
  }

  setFilter(character) {
    this.setState((prevState, props) => {
      if (prevState.filter === character) {
        return {filter: ''}
      }
      return {filter: character}
    })
  }

  handleContextRef(contextRef) {
    this.setState({ contextRef })
  }

  componentDidMount() {
    this.getData()
  }

  render() {

    let title, subtitle, body 
    let Menu = [], Relation = []

    if (this.state.data.length === 0) {
      title = settings.title
      subtitle = settings.subtitle
      body = (
        <section className='Home-body' >
          <div className='ui fluid action input' >
            <input type='text' placeholder='Your data source here... (.csv file)' onChange={e => {this.onInput(e)}} value={this.state.input} autoFocus />
            <button className='ui teal button' onClick={() => {this.onSubmit()}}>Submit</button>
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

    } else {
      title = this.state.title
      subtitle = this.state.subtitle
      const renderQuote = (quotes) => {
        if (quotes && quotes.length === 0) {
          return
        }
        const quotesJSX = quotes.map((data, index) => (
          <blockquote key={index} >
            <i className='quote left icon' />
            <i className='quote right icon' />
            {data.content}
            {data.author.length > 0 ? <p className='Author'>— {data.author}</p> : null}
          </blockquote>
        ))
        return(
          <div className='ui secondary segment'>
            {quotesJSX}
          </div>
        )
      }

      Relation = this.state.data.map((content, index) => {

        if (this.state.filter.length > 0 && this.state.filter !== content.subject && this.state.filter !== content.object) {
          return null
        }

        const isActive = this.state.scroll === index ? 'active': ''

        let time = ''
        if (content.time && content.time.length > 0) {
          time = (
          <span className='Menu-timestamp'>
          {content.time}
          </span>
          )
        }
        Menu.push(
          <a key={index} href={`#${index}`} className={`item ${isActive}`} onClick={() => this.scroll(index)} >
            {content.date}
            {time}
          </a>
        )

        let Note = (
          <div className='five wide column'>
          </div>
        )
        if (content.note && content.note.length > 0) {
          Note = (
            <div className='five wide column'>
              <h4 className='Note-header ui dividing teal header'>
                圍觀筆記
              </h4>
              <p className='Note-content'>
              {content.note}
              </p>
            </div>
          )
        }

        return (
          <article key={index} id={index}>
          <div className='ui two column stackable grid' >
            <div className='eleven wide column'>
            <div className={`Relation ui segments ${isActive}`}>
              <div className='ui segment'>
                <p>
                  <a className='ui large horizontal label' style={{backgroundColor: `hsla(${this.state.authorColor[content.subject]}, 50%, 50%, 0.3)`}} onClick={() => this.setFilter(content.subject)} >
                    {content.subject}
                  </a>
                  <span>
                  {content.action}
                  </span>
                  <a className='ui large horizontal label' style={{backgroundColor: `hsla(${this.state.authorColor[content.object]}, 50%, 50%, 0.3)`}} onClick={() => this.setFilter(content.object)} >
                    {content.object}
                  </a>
                  <span>
                  {content.content_topic}
                  </span>
                </p>
                <p className='description'>
                  {content.via}{content.channel}{content.content_carrier} — <a href={content["ref_url"]} target='_blank' rel='noopener noreferrer'>
                  {content.ref_title && content.ref_title.length > 0 ?
                    content.ref_title : content.ref_url}
                  </a>
                </p>
              </div>
              {renderQuote(content.quote)}
            </div>
            </div>
            {Note}
          </div>
          </article>
        )
      })

      const Filter = (
        <div className='ui two column stackable grid'>
          <div className='eleven wide column'>
            <p className='Filter-message'>Filtered by
              <span className='ui horizontal label' style={{margin: '0 0.5rem'}} >
                {this.state.filter}
                <i className='icon delete' onClick={() => this.setFilter(this.state.filter)} />
              </span>
            </p>
          </div>
        </div>
      )

      body = (
        <div className='Relation-wrapper' ref={this.handleContextRef}>
          <Rail position='left' style={{width: '4rem', padding: '0', margin: '1rem 0 0 0'}} >
            <Sticky context={this.state.contextRef} pushing={true}>
              <nav className='ui vertical fluid secondary tiny pointing pink menu'>
                <a className='item' onClick={() => this.scrollReset('top')} >
                  <i className='icon up chevron' style={{float: 'none', opacity: '0.5'}} />
                </a>
                {Menu}
                <a className='item' onClick={() => this.scrollReset('bottom')} >
                  <i className='icon down chevron' style={{float: 'none', opacity: '0.5'}} />
                </a>
              </nav>
            </Sticky>
          </Rail>
          {this.state.filter.length > 0 ? Filter : null}
          {Relation}
        </div>
      )
    }

    return (
      <div className="App" style={this.state.showMeta ? {left: '20rem'} : {}} >
        <Meta onCurrentClick={() => this.toggleMeta()} />
        <main className='App-main'>
          <Header logo={logo} title={title} subtitle={subtitle} status={this.state.status} onIconClick={() => this.getData()} onLogoClick={() => this.toggleMeta()} />
          <section className="App-body ui container">
            {body}
          </section>
          <hr className='ui divider' />
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;
