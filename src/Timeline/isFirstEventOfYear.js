import getDateTime from './getDateTime'

export default ({data, year, eventIndex}) => {
  const prevDateTime = getDateTime(data[eventIndex - 1])
  return year !== prevDateTime.year
}
