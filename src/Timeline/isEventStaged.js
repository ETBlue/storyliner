export default ({firstStagedEventIndex, lastStagedEventIndex, eventIndex}) => {
  return eventIndex >= firstStagedEventIndex && eventIndex <= lastStagedEventIndex
}
