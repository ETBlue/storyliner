import React, {useState, useEffect, useCallback} from 'react'
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

const App = (props) => {
  const queries = queryString.parse(props.location.search)
  const [status, setStatus] = useState('standby')

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [labelColor, setLabelColor] = useState(undefined)
  const [events, setEvents] = useState([])

  const [visibleEventIDs, setVisibleEventIDs] = useState([])
  const [firstStagedEventIndex, setFirstStagedEventIndex] = useState(0)
  const [lastStagedEventIndex, setLastStagedEventIndex] = useState(10)
  const updateVisibleEventIDs = () => {
    const STAGECAPACITY = 5
    const visibleIDs = getVisibleEventIDs(window.eventElements)

    setVisibleEventIDs(visibleIDs)
    setFirstStagedEventIndex(visibleIDs[0] - STAGECAPACITY)
    setLastStagedEventIndex(visibleIDs[visibleIDs.length - 1] + STAGECAPACITY)
  }

  const startApp = useCallback(() => {
    if (!queries.source || decodeURIComponent(queries.source).length === 0) {
      setStatus('invalid')
    } else {
      setStatus('loading')

      Papa.parse(queries.source, {
        download: true,
        complete: (result) => {
          const parsedCSV = parseCsvArray(result.data)
          updateStorage({
            title: parsedCSV.title,
            subtitle: parsedCSV.subtitle,
            storage,
            source: queries.source
          })

          setTitle(parsedCSV.title)
          setSubtitle(parsedCSV.subtitle)
          setLabelColor(parsedCSV.labelColor)
          setEvents(parsedCSV.events)
          setStatus('success')

          window.eventElements = window.document.getElementsByClassName('Event')
          updateVisibleEventIDs()
          window.addEventListener('scroll', updateVisibleEventIDs)
          window.setTimeout(() => {
            setStatus('standby')
          }, 5000)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }, [queries.source])
  useEffect(() => {
    startApp()
    return () => {
      delete window.eventElements
      window.removeEventListener('scroll', updateVisibleEventIDs)
    }
  }, [queries.source])

  const [filter, setFilter] = useState('')
  const handleFilterUpdate = (character) => {
    if (filter === character) {
      setFilter('')
    } else {
      setFilter(character)
    }
  }

  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const scrollReset = useCallback((direction) => {
    props.history.push(`${props.location.pathname}${props.location.search}`)
    if (direction === 'top') {
      window.scrollTo(0, 0)
    } else if (direction === 'bottom') {
      window.scrollTo(0, window.document.body.scrollHeight)
    }
  }, [props.history, props.location.pathname, props.location.search])

  // for sticky menu
  const [contextRef, setContextRef] = useState(null)
  const handleContextRef = (contextRef) => {
    setContextRef(contextRef)
  }

  const isAvailable = queries.source && events.length > 0
  return (
    <div className='App' style={showSidebar ? {left: '20rem'} : {}} >
      <Sidebar onCurrentClick={toggleSidebar} />
      <main className='App-main'>
        <Header logo={logo}
          title={isAvailable ? title : SETTINGS.title}
          subtitle={isAvailable ? subtitle : SETTINGS.subtitle}
          status={status}
          onIconClick={startApp}
          onLogoClick={toggleSidebar} />
        <section className='Body-wrapper ui container'>
          {isAvailable ? (
            <Timeline
              handleContextRef={handleContextRef}
              scrollReset={scrollReset}
              setFilter={handleFilterUpdate}
              queries={queries}
              events={events}
              filter={filter}
              firstStagedEventIndex={firstStagedEventIndex}
              lastStagedEventIndex={lastStagedEventIndex}
              visibleEventIDs={visibleEventIDs}
              contextRef={contextRef}
              labelColor={labelColor}
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

export default withRouter(App)
