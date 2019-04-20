import moment from 'moment'

export default (event) => {
  const momentDate = moment(event.date)
  const isStandard = event.date.includes('/') || event.date.includes('-') || event.date.length > 5
  const year = isStandard ? momentDate.year() : event.date
  const month = isStandard ? momentDate.month() + 1 : '?'
  const date = isStandard ? momentDate.date() : '?'
  const time = event.time && event.time.length > 0 ? event.time : null
  return {year, month, date, time, momentDate}
}
