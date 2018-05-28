import React, { Component } from 'react';
import { Sticky } from 'semantic-ui-react'

import Sidebar from './component/Sidebar'
import Home from './component/Home'
import Header from './component/Header'
import Footer from './component/Footer'

import csv2Obj from './function/csv2Obj'
import csv2Title from './function/csv2Title'
import storage from './function/getStorage'
import location from './function/getLocation'

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
      showSidebar: false
    }

    this.handleContextRef = this.handleContextRef.bind(this)
    this.onInput = this.onInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  resetStatus() {
    window.setTimeout(() => {
      this.setState({status: 'standby'})
    }, 5000)
  }

  toggleSidebar() {
    this.setState((prevState, props) => {
      return {showSidebar: !prevState.showSidebar}
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

        response.text().then(csvFile => {

          const titles = csv2Title(csvFile)
          let allHistory = JSON.parse(storage.getItem(settings.title))
          allHistory[this.state.source] = {
            title: titles.title,
            subtitle: titles.subtitle,
            time: Date.now()
          }
          storage.setItem(settings.title, JSON.stringify(allHistory))

          const parsed = csv2Obj(csvFile)

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

  scroll(relationDataIndex) {
    this.setState({scroll: relationDataIndex})
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

    let title, subtitle, Body

    // render welcome page when there is no data found
    if (this.state.data.length === 0) {

      // set up page titles
      title = settings.title
      subtitle = settings.subtitle

      // set up page body
      Body = <Home onInput={this.onInput} onSubmit={this.onSubmit} input={this.state.input} />

    // render data when available
    } else {

      // set up page titles
      title = this.state.title
      subtitle = this.state.subtitle

      // get ready to set up page body
      let Menu = [], Relation = []

      // get ready to render quotes
      const renderQuote = (quotesArray) => {

        // in case something goes wrong...
        if (!quotesArray) {
          return null
        }

        // render nothing when data is empty
        if (quotesArray.length === 0) {
          return null
        }

        // render quotes normally
        const quotesJSX = quotesArray.map((data, index) => {

          // not showing author by default
          let Author = null

          // show author if necessary
          if (data.author.length > 0) {
            if (!quotesArray[index + 1] || data.author !== quotesArray[index + 1].author) {
              Author = <p className='Author'>— {data.author}</p>
            }
          }

          // generate one quote
          return (
            <blockquote key={index} >
              <i className='quote left icon' />
              <i className='quote right icon' />
              {data.content}
              {Author}
            </blockquote>
          )
        })

        // generate the quote section
        return(
          <div className='ui secondary segment'>
            {quotesJSX}
          </div>
        )
      }

      // render relations
      Relation = this.state.data.map((relationData, relationDataIndex) => {

        // render nothing if this relation is filtered out
        if (this.state.filter.length > 0 && this.state.filter !== relationData.subject && this.state.filter !== relationData.object) {
          return null
        }

        // set up status of this relation
        const isActive = this.state.scroll === relationDataIndex ? 'active': ''

        // render no timestamp by default
        let Time = null, time = null

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
        const year = dateTime.getFullYear()
        const month = dateTime.getMonth() > 0 ? dateTime.getMonth() : '?'
        const date = month === '?' ? '?' : dateTime.getDate()

        // setup timestamp for relation block
        const Timestamp = (
          <div className='Timestamp ui secondary right aligned segment'>
            {year}-{month}-{date} {time}
          </div>
        )

        // set up year mark on top of the first menu item
        if (!this.state.data[relationDataIndex - 1]) {
          Menu.push(
            <div key={`year-of-${relationDataIndex}`} className='YearMark item'>
              {year}
            </div>
          )

        // set up year mark on top of the first menu item from the same year
        } else {
          const prevDateTime = new Date(this.state.data[relationDataIndex - 1].date)
          const prevYear = prevDateTime.getFullYear()
          if (year !== prevYear) {
            Menu.push(
              <div key={`year-of-${relationDataIndex}`} className='YearMark item'>
                {year}
              </div>
            )
          }
        }

        // set up menu item for this relation
        Menu.push(
          <a key={relationDataIndex} href={`#${relationDataIndex}`} className={`Menu item ${isActive}`} onClick={() => this.scroll(relationDataIndex)} >
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
              {relationData.via}{relationData.channel}{relationData.content_carrier} — <a href={relationData["ref_url"]} target='_blank' rel='noopener noreferrer'>
              {relationData.ref_title && relationData.ref_title.length > 0 ?
                relationData.ref_title : relationData.ref_url}
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
                {Timestamp}
                <div className='ui segment'>
                  <p>
                    <a className='ui large horizontal label' style={{backgroundColor: `hsla(${this.state.authorColor[relationData.subject]}, 50%, 50%, 0.3)`}} onClick={() => this.setFilter(relationData.subject)} >
                      {relationData.subject}
                    </a>
                    <span>
                    {relationData.action}
                    </span>
                    <a className='ui large horizontal label' style={{backgroundColor: `hsla(${this.state.authorColor[relationData.object]}, 50%, 50%, 0.3)`}} onClick={() => this.setFilter(relationData.object)} >
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
      if (this.state.filter.length > 0) {
        Filter = (
          <div className='Filter ui two column stackable grid'>
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
      }

      Body = (
        <div className='Body'>
          <div className='Menu-wrapper' ref={this.handleContextRef}>
            <Sticky context={this.state.contextRef}>
              <nav className='ui vertical fluid secondary mini pointing pink menu'>
                <a className='item' onClick={() => this.scrollReset('top')} >
                  <i className='icon up chevron' style={{float: 'none', opacity: '0.5'}} />
                </a>
                {Menu}
                <a className='item' onClick={() => this.scrollReset('bottom')} >
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

    return (
      <div className="App" style={this.state.showSidebar ? {left: '20rem'} : {}} >
        <Sidebar onCurrentClick={() => this.toggleSidebar()} />
        <main className='App-main'>
          <Header logo={logo} title={title} subtitle={subtitle} status={this.state.status} onIconClick={() => this.getData()} onLogoClick={() => this.toggleSidebar()} />
          <section className='Body-wrapper ui container'>
            {Body}
          </section>
          <hr className='ui divider' />
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;
