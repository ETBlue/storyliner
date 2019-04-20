import getDateTime from './getDateTime'

export default ({events, year, eventIndex}) => {
  const prevDateTime = getDateTime(events[eventIndex - 1])
  return year !== prevDateTime.year
}
