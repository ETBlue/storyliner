export default (text) => {
  const lines = text.split('\n')

  if (lines.length < 2) {
    return []
  }

  const headers = lines[1].split(',')
  let result = []

  for (let i = 2; i < lines.length; i++){
    let obj = {quote: []}
    let author = ''
    const columns = lines[i].split(',')

    headers.forEach((header, index) => {
      if (header === '_quote_author') {
        author = columns[index] || ''
      } else if (header === 'quote_content') {
        if (columns[index] && columns[index].length > 0) {
          obj.quote = columns[index].split(';').map((q) => {
            return {author: author, content: q}
          })
        }
      } else {
        obj[header] = columns[index] || ''
      }
    })

    // when the date colume is empty, merge quotes
    if (obj.date && obj.date.length === 0) {
      result[result.length - 1].quote = result[result.length - 1].quote.concat(obj.quote)
    } else {
      result.push(obj)
    }
  }

  return result
}

