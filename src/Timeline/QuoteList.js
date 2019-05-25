import React from 'react'

const QuoteList = ({quotes}) => {
  const quotesJSX = quotes.map((quote, quoteIndex) => {
    let Author = null

    if (quote.author.length > 0) {
      if (!quotes[quoteIndex + 1] || quote.author !== quotes[quoteIndex + 1].author) {
        Author = <p className='Author'>— {quote.author}</p>
      }
    }

    return (
      <blockquote key={quoteIndex} >
        <i className='quote left icon' />
        <i className='quote right icon' />
        {quote.content}
        {Author}
      </blockquote>
    )
  })

  return (
    <div className='QuoteList ui secondary segment'>
      {quotesJSX}
    </div>
  )
}

export default React.memo(QuoteList)
