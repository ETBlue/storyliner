import moment from 'moment'

export default (event) => {
  const eventDate = moment(event.date)
  const isStandard = event.date.includes('/') || event.date.includes('-') || event.date.length > 5
  const year = isStandard ? eventDate.year() : event.date
  const month = isStandard ? eventDate.month() + 1 : '?'
  const date = isStandard ? eventDate.date() : '?'
  const time = event.time && event.time.length > 0 ? event.time : null
  return {year, month, date, time}
}
