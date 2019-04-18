export default ({data, year, eventIndex}) => {
  const prevYmd = data[eventIndex - 1].date.split('/')
  const prevYear = prevYmd[0]
  return year !== prevYear
}
