import React from 'react'

export default (quotesArray) => {
  if (!quotesArray || quotesArray.length === 0) {
    return null
  }

  const quotesJSX = quotesArray.map((data, index) => {
    let Author = null

    if (data.author.length > 0) {
      if (!quotesArray[index + 1] || data.author !== quotesArray[index + 1].author) {
        Author = <p className='Author'>— {data.author}</p>
      }
    }

    return (
      <blockquote key={index} >
        <i className='quote left icon' />
        <i className='quote right icon' />
        {data.content}
        {Author}
      </blockquote>
    )
  })

  return (
    <div className='ui secondary segment'>
      {quotesJSX}
    </div>
  )
}
