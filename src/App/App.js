import React from 'react'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Papa from 'papaparse'

import {Sidebar} from '../Sidebar'
import {Home} from '../Home'
import {Header} from '../Header'
import {Footer} from '../Footer'
import {Timeline} from '../Timeline'

import csv2Obj from './csv2Obj'
import csv2Title from './csv2Title'
import isInViewport from './isInViewport'
import {SETTINGS, getStorage} from '../_shared'

import logo from './logo.svg'
import './App.css'


class App extends React.Component {
  queries = queryString.parse(this.props.location.search)

  componentDidMount () {
    this.startApp()
    window.addEventListener('scroll', (e) => {
      this.updateVisibleEventIDs()
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.queries = queryString.parse(this.props.location.search)
      this.startApp()
    }
  }

  state = {
    // API related
    isLoaded: false,
    status: 'standby',

    // data related
    data: [],
    title: '',
    subtitle: '',

    // view related
    filter: '',
    showSidebar: false,
    visibleEventIDs: new Set(),
    firstStagedEventID: 0,
    lastStagedEventID: 10,

    // sticky menu related
    contextRef: null
  }

  updateVisibleEventIDs = () => {
    let visibleEventIDs = new Set()
    const stagedEventAmount = 5
    let firstStagedEventID, lastStagedEventID
    let firstCounted = false
    let lastCounted = false
    const relationElementList = window.document.getElementsByClassName('Event')
    Array.from(relationElementList).forEach((elem, elemIndex) => {
      if (isInViewport(elem)) {
        if (!firstCounted) {
          firstStagedEventID = parseInt(elem.id, 10) - stagedEventAmount
          firstCounted = true
        }
        visibleEventIDs.add(elem.id)
      } else {
        if (firstCounted && !lastCounted) {
          lastStagedEventID = parseInt(elem.id, 10) + stagedEventAmount - 1
          lastCounted = true
        }
      }
    })
    this.setState({visibleEventIDs, firstStagedEventID, lastStagedEventID})
  }

  resetStatus = () => {
    window.setTimeout(() => {
      this.setState({status: 'standby'}, this.updateVisibleEventIDs())
    }, 5000)
  }

  toggleSidebar = () => {
    this.setState((prevState, props) => {
      return {showSidebar: !prevState.showSidebar}
    })
  }

  startApp = () => {
    if (!this.queries.source || decodeURIComponent(this.queries.source).length === 0) {
      this.setState({status: 'invalid', isLoaded: false})
      return
    }

    this.fetchData()
  }

  fetchData = () => {
    this.setState({status: 'loading', isLoaded: false}, () => {
      Papa.parse(this.queries.source, {
        download: true,
        complete: (result) => {
          const csvFile = result.data

          const titles = csv2Title(csvFile)
          let allHistory = JSON.parse(getStorage.getItem(SETTINGS.title))
          allHistory[this.queries.source] = {
            title: titles.title,
            subtitle: titles.subtitle,
            time: Date.now()
          }
          for (const entry in allHistory) {
            if (!entry.match(/^http/) ||
              allHistory[entry].title.includes('<!DOCTYPE html>')
            ) {
              delete allHistory[entry]
            }
          }
          getStorage.setItem(SETTINGS.title, JSON.stringify(allHistory))

          const parsed = csv2Obj(csvFile)
          this.setState({
            title: titles.title,
            subtitle: titles.subtitle,
            data: parsed.data,
            authorColor: parsed.authorColor,
            isLoaded: true,
            status: 'success'
          }, this.resetStatus())
        },
        error: (error) => {
          console.error(error)
        }
      })
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
    const queries = queryString.parse(this.props.location.search)
    let title, subtitle, Body

    // render welcome page when there is no data found
    if (!queries.source || this.state.data.length === 0) {
      title = SETTINGS.title
      subtitle = SETTINGS.subtitle
      Body = <Home />

    // render data when available
    } else {
      title = this.state.title
      subtitle = this.state.subtitle
      Body = <Timeline
        handleContextRef={this.handleContextRef}
        scrollReset={this.scrollReset}
        setFilter={this.setFilter}
        {...this.state} />
    }

    return (
      <div className='App' style={this.state.showSidebar ? {left: '20rem'} : {}} >
        <Sidebar onCurrentClick={this.toggleSidebar} />
        <main className='App-main'>
          <Header logo={logo} title={title} subtitle={subtitle} status={this.state.status}
            onIconClick={this.startApp}
            onLogoClick={this.toggleSidebar} />
          <section className='Body-wrapper ui container'>
            {Body}
          </section>
          <hr className='ui divider' />
          <Footer />
        </main>
      </div>
    )
  }
}

export default withRouter(App)
