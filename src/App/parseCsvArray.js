import {LABELS, SETTINGS} from '../_shared'
import COLORS from './COLORS'

export default (lines) => {
  const titles = lines[SETTINGS.titleRowIndex]
  const title = titles[0]
  const subtitle = titles[1]

  const events = []
  const headers = lines[SETTINGS.headerRowIndex]
  const labels = new Set()

  lines.forEach((line, lineIndex) => {
    if (lineIndex <= SETTINGS.headerRowIndex) {
      return
    }

    const event = {quote: []}
    let author = ''
    line.forEach((column, columnIndex) => {
      const header = headers[columnIndex]
      switch (header) {
        case 'quote_author':
          author = column || ''
          break
        case 'quote_content':
          if (column && column.length > 0) {
            column.split('\n').forEach((quote) => {
              event.quote.push({
                author,
                content: quote
              })
            })
          }
          break
        case 'via':
          // alias from old version
          event.channel_prep = column || ''
          break
        case 'content_topic':
          // alias from old version
          event.topic = column || ''
          break
        default:
          event[header] = column || ''
          if (LABELS.includes(header)) {
            labels.add(column)
          }
      }
    })
    if (event.date.length === 0) {
      // when the date colume is empty, merge quotes into latest object
      events[events.length - 1].quote = events[events.length - 1].quote.concat(event.quote)
    } else {
      events.push(event)
    }
  })

  const labelColor = {}
  labels.delete('')
  labels.forEach((label) => {
    const index = Math.floor(Math.random() * COLORS.length)
    labelColor[label] = COLORS[index]
  })

  return {title, subtitle, events, labelColor}
}
