// authors and colors
const colorSpace = 40
let defaultColors = []
for (let i = 0; i < 360 / colorSpace; i++) {
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

  const lastColumnIndex = headers.length - 1
  let baseColumnIndex, currentLineObject, currentAuthor

  const resetRelationObject = () => {
    baseColumnIndex = 0
    currentLineObject = {quote: []}
    currentAuthor = ''
  }
  resetRelationObject()

  for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
    const columns = lines[lineIndex].split(',')

    for (let columnIndex = 0; columnIndex < columns.length ; columnIndex++) {
      const header = headers[columnIndex + baseColumnIndex]

      if (header === 'quote_author') {
        currentAuthor = columns[columnIndex] || ''

      } else if (header === 'quote_content') {
        if (columns[columnIndex] && columns[columnIndex].length > 0) {
          currentLineObject.quote.push({author: currentAuthor, content: columns[columnIndex].replace(/"/, '')})
        }

      } else {
        currentLineObject[header] = columns[columnIndex] || ''
        if (header === 'object' || header === 'subject') {
          authors.add(columns[columnIndex])
        }
      }

      if (columnIndex + baseColumnIndex === lastColumnIndex) {
        // when the date colume is empty, merge quotes
        if (currentLineObject.date === '') {
          result[result.length - 1].quote = result[result.length - 1].quote.concat(currentLineObject.quote)

        } else {
          result.push(currentLineObject)
        }

        resetRelationObject()

      } else {
        if (columnIndex === columns.length - 1) {
          baseColumnIndex += columnIndex
        }
      }

    }
  }

  let authorColor = {}
  authors.delete('')
  authors.forEach(author => {
    const index = Math.floor(Math.random() * colors.size)
    const color = Array.from(colors)[index]
    authorColor[author] = color * colorSpace
    colors.delete(color)
    if (colors.size === 0) {
      colors = new Set(defaultColors)
    }
  })
  return {data: result, authorColor: authorColor}
}

