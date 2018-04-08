const space = 40
let defaultColors = []
for (let i = 0; i < 360 / space; i++) {
  defaultColors.push(i)
}
let colors = new Set(defaultColors)
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
      if (header === 'quote_author') {
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
        if (header === 'object' || header === 'subject') {
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
    if (colors.size === 0) {
      colors = new Set(defaultColors)
    }
  })
  return {data: result, authorColor: authorColor}
}

