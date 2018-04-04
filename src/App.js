import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      isLoaded: false,
      data: [],
      title: ''
    }

  }

  componentDidMount() {

    const csv2Obj = (text) => {
      const lines = text.split('\n')
      const headers = lines[0].split(',')
      let result = []
      for (let i = 1; i < lines.length; i++){
        let obj = {}
        const columns = lines[i].split(',')
        headers.forEach((header, index) => {
          obj[header] = columns[index]
        })
        result.push(obj)
      }
      return result
    }

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ukLhLNcPLc20_7J2ju6_e_KSLW2RW0LDu_1_4__IvaVUCO1BhZ9RGwefcWkOVRQ8XjlYv6MSe8oA/pub?gid=65178148&single=true&output=csv")
      .then((respond) => {
        respond.text().then(text => {
          this.setState({
            title: text.split('\n')[1].split(',')[0]
          })
        })
      })
      .catch(error => console.error(error))

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ukLhLNcPLc20_7J2ju6_e_KSLW2RW0LDu_1_4__IvaVUCO1BhZ9RGwefcWkOVRQ8XjlYv6MSe8oA/pub?gid=1467627135&single=true&output=csv")
      .then((respond) => {
        respond.text().then(text => {
          this.setState({
            data: csv2Obj(text),
            isLoaded: true
          })
        })
      })
      .catch(error => console.error(error))
  }

  render() {

    const Relation = this.state.data.map((content, index) => (
        <p key={index}>
          {content._subject} {content.action} {content._object}
        </p>
    ))

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <section className="App-intro">
          {Relation}
        </section>
      </div>
    );
  }
}

export default App;
