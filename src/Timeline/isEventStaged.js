export default ({firstStagedEventID, lastStagedEventID, eventIndex}) => {
  return eventIndex >= firstStagedEventID && eventIndex <= lastStagedEventID
}
