// define a set of author correlated colors
const colorSpace = 40
let defaultColors = []
for (let i = 0; i < 360 / colorSpace; i++) {
  defaultColors.push(i)
}
let colors = new Set(defaultColors)

// define a set of authors
const authors = new Set()

export default (csvFile) => {

  // break csv into lines
  const lines = csvFile.split('\n')
  if (lines.length < 2) {
    return []
  }

  // use the second line as object keys
  const headers = lines[1].split(',')

  // set up the array to be returned
  let result = []

  // remember the theoratical length of each line
  const lastColumnIndex = headers.length - 1

  // get ready to turn lines into objects
  // these vars are for objects from more than one line (caused by in-cell line break in google spreadsheet)
  let baseColumnIndex, currentLineObject, currentAuthor
  const resetRelationObject = () => {
    baseColumnIndex = 0
    currentLineObject = {quote: []}
    currentAuthor = ''
  }
  resetRelationObject()

  // go through each line
  for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
    const columns = lines[lineIndex].split(',')

    // go through each cell in each line
    for (let columnIndex = 0; columnIndex < columns.length ; columnIndex++) {

      // for all cells
      const header = headers[columnIndex + baseColumnIndex]

      // for quotes related cells
      if (header === 'quote_author') {
        currentAuthor = columns[columnIndex] || ''

      } else if (header === 'quote_content') {
        if (columns[columnIndex] && columns[columnIndex].length > 0) {
          currentLineObject.quote.push({author: currentAuthor, content: columns[columnIndex].replace(/"/, '')})
        }

      // for non-quotes related cells
      } else {
        currentLineObject[header] = columns[columnIndex] || ''

        // for authors related cells
        if (header === 'object' || header === 'subject') {
          authors.add(columns[columnIndex])
        }
      }

      // for the last cell of the object
      if (columnIndex + baseColumnIndex === lastColumnIndex) {

        // when the date colume is empty, merge quotes into latest object
        if (currentLineObject.date === '') {
          result[result.length - 1].quote = result[result.length - 1].quote.concat(currentLineObject.quote)

        // or normally submit the object to the result array
        } else {
          result.push(currentLineObject)
        }

        // reset everything for the next object
        resetRelationObject()

      // for other cells of the object
      } else {

        // for the last cell of the line
        if (columnIndex === columns.length - 1) {
          baseColumnIndex += columnIndex
        }
      }
    }
  }

  // get ready to set up colors for all authors
  let authorColor = {}

  // remove empty authors
  authors.delete('')

  // randomly choose colors for authors
  authors.forEach(author => {
    const index = Math.floor(Math.random() * colors.size)
    const color = Array.from(colors)[index]
    authorColor[author] = color * colorSpace
    colors.delete(color)
    if (colors.size === 0) {
      colors = new Set(defaultColors)
    }
  })

  // done
  return {data: result, authorColor: authorColor}
}

