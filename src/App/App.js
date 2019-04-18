import React, { Component } from 'react'
import { Sticky } from 'semantic-ui-react'
import Papa from 'papaparse'

import {Sidebar} from '../Sidebar'
import {Home} from '../Home'
import {Header} from '../Header'
import {Footer} from '../Footer'
import {Timeline} from '../Timeline'

import csv2Obj from './csv2Obj'
import csv2Title from './csv2Title'
import isInViewport from './isInViewport'
import {SETTINGS, getStorage, getLocation} from '../_shared'

import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor (props) {

    super(props)

    this.state = {

      // API related
      input: decodeURIComponent(getLocation.search.replace('?source=', '')),
      source: decodeURIComponent(getLocation.search.replace('?source=', '')),
      isLoaded: false,
      status: 'standby',

      // data related
      data: [],
      title: '',
      subtitle: '',

      // view related
      filter: '',
      showSidebar: false,
      visibleRelationIDs: new Set(),
      firstStagedRelationID: 0,
      lastStagedRelationID: 10,

      // sticky menu related
      contextRef: null,
      scrollToRelation: parseInt(getLocation.hash.replace('#', ''), 10)
    }

    this.handleContextRef = this.handleContextRef.bind(this)
    this.onInput = this.onInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentDidMount () {
    this.getData()
    window.addEventListener('scroll', (e) => {
      this.updateVisibleRelationIDs()
    })
  }

  updateVisibleRelationIDs () {
    let visibleRelationIDs = new Set()
    const stagedRelationAmount = 5
    let firstStagedRelationID, lastStagedRelationID
    let firstCounted = false
    let lastCounted = false
    const relationElementList = window.document.getElementsByClassName('Relation')
    Array.from(relationElementList).forEach((elem, elemIndex) => {
      if (isInViewport(elem)) {
        if (!firstCounted) {
          firstStagedRelationID = parseInt(elem.id, 10) - stagedRelationAmount
          firstCounted = true
        }
        visibleRelationIDs.add(elem.id)
      } else {
        if (firstCounted && !lastCounted) {
          lastStagedRelationID = parseInt(elem.id, 10) + stagedRelationAmount - 1
          lastCounted = true
        }
      }
    })
    this.setState({visibleRelationIDs, firstStagedRelationID, lastStagedRelationID})
  }

  resetStatus () {
    window.setTimeout(() => {
      this.setState({status: 'standby'}, this.updateVisibleRelationIDs())
    }, 5000)
  }

  toggleSidebar () {
    this.setState((prevState, props) => {
      return {showSidebar: !prevState.showSidebar}
    })
  }

  getData () {

    if (this.state.source.length === 0) {
      this.setState({status: 'invalid', isLoaded: false})
      return
    }

    this.setState({status: 'loading', isLoaded: false}, () => {

      Papa.parse(this.state.source, {
        download: true,
        complete: (result) => {
          const csvFile = result.data

          const titles = csv2Title(csvFile)
          let allHistory = JSON.parse(getStorage.getItem(SETTINGS.title))
          allHistory[this.state.source] = {
            title: titles.title,
            subtitle: titles.subtitle,
            time: Date.now()
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

  onInput (e) {
    this.setState({input: decodeURIComponent(e.target.value)})
  }

  onSubmit () {
    getLocation.assign(`?source=${this.state.input}`)
  }

  scrollToRelation (relationDataIndex) {
    this.setState({scrollToRelation: relationDataIndex})
  }

  scrollReset (direction) {
    this.setState({scrollToRelation: ''})
    window.history.pushState({}, '', getLocation.pathname + getLocation.search)
    if (direction === 'top') {
      window.scrollTo(0, 0)
    } else if (direction === 'bottom') {
      window.scrollTo(0, window.document.body.scrollHeight)
    }
  }

  setFilter (character) {
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

  render () {

    let title, subtitle, Body

    // render welcome page when there is no data found
    if (this.state.data.length === 0) {

      // set up page titles
      title = SETTINGS.title
      subtitle = SETTINGS.subtitle

      // set up page body
      Body = <Home onInput={this.onInput} onSubmit={this.onSubmit} input={this.state.input} />

    // render data when available
    } else {

      // set up page titles
      title = this.state.title
      subtitle = this.state.subtitle
      Body = <Timeline
        handleContextRef={this.handleContextRef}
        scrollReset={this.scrollReset}
        scrollToRelation={this.scrollToRelation}
        setFilter={this.setFilter}
        {...this.state} />
    }

    return (
      <div className='App' style={this.state.showSidebar ? {left: '20rem'} : {}} >
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
    )
  }
}

export default App
