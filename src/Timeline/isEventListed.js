export default ({filter, event}) => {
  const isFilteredOut = filter.length > 0 &&
    filter !== event.subject &&
    filter !== event.object

  return !isFilteredOut
}
