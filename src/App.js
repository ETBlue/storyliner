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
      const headers = lines[1].split(',')
      let result = []

      for (let i = 2; i < lines.length; i++){
        let obj = {quote: []}
        let author = ''
        const columns = lines[i].split(',')

        headers.forEach((header, index) => {
          if (header === '_quote_author') {
            author = columns[index]
          } else if (header === 'quote_content') {
            if (columns[index].length !== 0) {
              obj.quote = columns[index].split(';').map((q) => {
                return {author: author, content: q}
              })
            }
          } else {
            obj[header] = columns[index]
          }
        })

        // when the date colume is empty, merge quotes
        if (obj.date.length === 0) {
          result[result.length - 1].quote = result[result.length - 1].quote.concat(obj.quote)
        } else {
          result.push(obj)
        }
      }

      return result
    }

    const csv2Title = (text) => {
      return text.split('\n')[0].split(',')[0]
    }

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8ukLhLNcPLc20_7J2ju6_e_KSLW2RW0LDu_1_4__IvaVUCO1BhZ9RGwefcWkOVRQ8XjlYv6MSe8oA/pub?gid=1467627135&single=true&output=csv")
      .then((respond) => {
        respond.text().then(text => {
          this.setState({
            title: csv2Title(text),
            data: csv2Obj(text),
            isLoaded: true
          })
        })
      })
      .catch(error => console.error(error))

  }

  render() {

    const renderQuote = (quotes) => {
      if (quotes.length === 0) {
        return
      }
      const quotesJSX = quotes.map((data, index) => (
        <blockquote key={index} >
          <i className='quote left icon' />
          <i className='quote right icon' />
          {data.content}<span style={{fontSize: '0.85em', opacity: '0.85', display:'inline-block'}} > — {data.author}</span>
        </blockquote>
      ))
      return(
        <div className='ui secondary segment'>
          {quotesJSX}
        </div>
      )
    }

    let Menu = []

    const Relation = this.state.data.map((content, index) => {
      Menu.push(
        <a key={index} className='item'>
          {content.date}
        </a>
      )

      return (
        <article key={index}>
        <div className='ui two column stackable grid' >
          <div className='eleven wide column'>
          <div className='ui segments'>
            <div className='ui segment'>
              <p>
                <a className='ui large horizontal label' data-role={content._subject}>
                  {content._subject}
                </a>
                <span>
                {content.action}
                </span>
                <a className='ui large horizontal label' data-role={content._object}>
                  {content._object}
                </a>
                <span>
                {content.content_topic}
                </span>
              </p>
              <p style={{marginTop: '-0.5rem', opacity: '0.85', fontSize: '0.85em'}} >
                {content.via}{content.channel}{content.content_carrier} — 
                <a href={content["ref_url"]} target='_blank'>
                {content.ref_title.length > 0 ?
                  content.ref_title : content.ref_url}
                </a>
              </p>
            </div>
            {renderQuote(content.quote)}
          </div>
          </div>
          <div className='five wide column'>
            <h4 className='ui dividing header' style={{color: 'rgba(0,0,0,0.6)'}} >
              圍觀筆記
            </h4>
            <p style={{opacity: '0.85'}} >
            {content.note}
            </p>
          </div>
        </div>
        </article>
      )
    })

    return (
      <div className="App">
        <header className='App-header'>
          <h1 className="ui header">
            <img src={logo} alt="logo" className='ui image App-logo' />
            <div className='content'>
              <i className='icon bars' style={{position: 'absolute', right: '2rem', margin: '0', opacity: '0.5', fontSize: '1.5rem'}} />
              {this.state.title}
            </div>
          </h1>
        </header>
        <section className="App-body ui container" style={{display: 'flex'}} >
        <div style={{width: '5rem', flex: 'none'}}>
            <nav className='ui vertical fluid secondary pointing menu'>
              {Menu}
            </nav>
        </div>
          <div style={{width: '100%', paddingLeft: '2rem'}} >
          {Relation}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
