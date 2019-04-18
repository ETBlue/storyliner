export default ({filter, event}) => {
  const isFilteredOut = filter.length > 0 &&
    filter !== event.subject &&
    filter !== event.object &&
    filter !== event.subject_1 &&
    filter !== event.object_1

  return !isFilteredOut
}
