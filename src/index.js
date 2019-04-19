import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import {SETTINGS} from './_shared'
import {App} from './App/'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Router basename={SETTINGS.baseUrl}><App /></Router>, document.getElementById('root'))
registerServiceWorker()
