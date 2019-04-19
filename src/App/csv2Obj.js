import {LABELS} from '../_shared'
import COLORS from './COLORS'

let colors = new Set(COLORS)
const labels = new Set()

let currentEvent = {quote: []}
let currentAuthor = ''
const resetCurrentEvent = () => {
  currentEvent = {quote: []}
  currentAuthor = ''
}

export default (lines) => {
  if (lines.length < 2) {
    return []
  }

  const events = []
  const headers = lines[1]
  const lastColumnIndex = headers.length - 1

  for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
    const columns = lines[lineIndex]

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const header = headers[columnIndex]

      switch (header) {
        case 'quote_author':
          currentAuthor = columns[columnIndex] || ''
          break
        case 'quote_content':
          if (columns[columnIndex] && columns[columnIndex].length > 0) {
            columns[columnIndex].split('\n').forEach((quote) => {
              currentEvent.quote.push({
                author: currentAuthor,
                content: quote
              })
            })
          }
          break
        case 'via':
          // alias from old version
          currentEvent.channel_prep = columns[columnIndex] || ''
          break
        case 'content_topic':
          // alias from old version
          currentEvent.topic = columns[columnIndex] || ''
          break
        default:
          currentEvent[header] = columns[columnIndex] || ''
          if (LABELS.includes(header)) {
            labels.add(columns[columnIndex])
          }
      }

      if (columnIndex === lastColumnIndex) {
        if (currentEvent.date === '') {
          // when the date colume is empty, merge quotes into latest object
          events[events.length - 1].quote = events[events.length - 1].quote.concat(currentEvent.quote)
        } else {
          // or normally submit the object to the events array
          events.push(currentEvent)
        }

        resetCurrentEvent()
      }
    }
  }

  let labelColor = {}

  labels.delete('')
  labels.forEach(label => {
    const index = Math.floor(Math.random() * colors.size)
    const color = Array.from(colors)[index]
    labelColor[label] = color
    colors.delete(color)
    if (colors.size === 0) {
      colors = new Set(COLORS)
    }
  })

  return {data: events, labelColor: labelColor}
}
