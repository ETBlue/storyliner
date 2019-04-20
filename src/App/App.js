import React from 'react'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Papa from 'papaparse'

import {SETTINGS, storage} from '../_shared'

import {Sidebar} from '../Sidebar'
import {Home} from '../Home'
import {Header} from '../Header'
import {Footer} from '../Footer'
import {Timeline} from '../Timeline'

import parseCsvArray from './parseCsvArray'
import updateStorage from './updateStorage'
import getVisibleEventIDs from './getVisibleEventIDs'

import logo from './logo.svg'
import './App.css'

class App extends React.Component {
  state = {
    queries: queryString.parse(this.props.location.search),
    isLoaded: false,
    status: 'standby',

    title: '',
    subtitle: '',
    events: [],

    filter: '',
    showSidebar: false,
    visibleEventIDs: [],
    firstStagedEventIndex: 0,
    lastStagedEventIndex: 10,

    // for sticky menu
    contextRef: null
  }

  componentDidMount () {
    this.startApp()
    window.addEventListener('scroll', (e) => {
      this.updateVisibleEventIDs()
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const prevSource = this.state.queries.source
      const newQueries = queryString.parse(this.props.location.search)
      this.setState({queries: newQueries}, () => {
        if (prevSource !== newQueries.source) {
          this.startApp()
        }
      })
    }
  }

  startApp = () => {
    if (!this.state.queries.source || decodeURIComponent(this.state.queries.source).length === 0) {
      this.setState({status: 'invalid', isLoaded: false})
      return
    }
    this.fetchData()
  }

  fetchData = () => {
    this.setState({status: 'loading', isLoaded: false}, () => {
      Papa.parse(this.state.queries.source, {
        download: true,
        complete: (result) => {
          const {title, subtitle, events, labelColor} = parseCsvArray(result.data)
          updateStorage({title, subtitle, storage, source: this.state.queries.source})
          this.setState({title, subtitle, events, labelColor,
            isLoaded: true,
            status: 'success'
          }, () => {
            this.eventElements = window.document.getElementsByClassName('Event')
            this.updateVisibleEventIDs()
            window.setTimeout(() => {
              this.setState({status: 'standby'})
            }, 5000)
          })
        },
        error: (error) => {
          console.error(error)
        }
      })
    })
  }

  updateVisibleEventIDs = () => {
    const STAGECAPACITY = 5
    const visibleIDs = getVisibleEventIDs(this.eventElements)

    this.setState({
      visibleEventIDs: visibleIDs,
      firstStagedEventIndex: visibleIDs[0] - STAGECAPACITY,
      lastStagedEventIndex: visibleIDs[visibleIDs.length - 1] + STAGECAPACITY
    })
  }

  toggleSidebar = () => {
    this.setState((prevState, props) => {
      return {showSidebar: !prevState.showSidebar}
    })
  }

  scrollReset = (direction) => {
    this.props.history.push(`${this.props.location.pathname}${this.props.location.search}`)
    if (direction === 'top') {
      window.scrollTo(0, 0)
    } else if (direction === 'bottom') {
      window.scrollTo(0, window.document.body.scrollHeight)
    }
  }

  setFilter = (character) => {
    this.setState((prevState, props) => {
      if (prevState.filter === character) {
        return {filter: ''}
      }
      return {filter: character}
    })
  }

  handleContextRef = (contextRef) => {
    this.setState({ contextRef })
  }

  render () {
    const isAvailable = this.state.queries.source && this.state.events.length > 0
    const {title, subtitle} = isAvailable ? this.state : SETTINGS

    return (
      <div className='App' style={this.state.showSidebar ? {left: '20rem'} : {}} >
        <Sidebar onCurrentClick={this.toggleSidebar} />
        <main className='App-main'>
          <Header logo={logo} title={title} subtitle={subtitle} status={this.state.status}
            onIconClick={this.startApp}
            onLogoClick={this.toggleSidebar} />
          <section className='Body-wrapper ui container'>
            {isAvailable ? (
              <Timeline
                handleContextRef={this.handleContextRef}
                scrollReset={this.scrollReset}
                setFilter={this.setFilter}
                {...this.state}
              />
            ) : (
              <Home />
            )}
          </section>
          <hr className='ui divider' />
          <Footer />
        </main>
      </div>
    )
  }
}

export default withRouter(App)
