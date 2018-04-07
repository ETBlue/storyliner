const colors = new Set([0,1,2,3,4,5,6,7,8])
const space = 40

const authors = new Set()

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
            return {author: '', content: q}
          })
          obj.quote[obj.quote.length - 1].author = author
        }
      } else {
        obj[header] = columns[index] || ''
        if (header === '_object' || header === '_subject') {
          authors.add(columns[index])
        }
      }
    })

    // when the date colume is empty, merge quotes
    if (obj.date === '') {
      result[result.length - 1].quote = result[result.length - 1].quote.concat(obj.quote)
    } else {
      result.push(obj)
    }
  }

  let authorColor = {}
  authors.delete('')
  authors.forEach(author => {
    const index = Math.floor(Math.random() * colors.size)
    const color = Array.from(colors)[index]
    authorColor[author] = color * space
    colors.delete(color)
  })
  return {data: result, authorColor: authorColor}
}

