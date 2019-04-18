export default ({visibleEventIDs, eventIndex}) => {
  return visibleEventIDs.has(eventIndex.toString())
}
