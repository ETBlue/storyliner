export default ({events, eventIndex}) => {
  const event = events[eventIndex]
  const prevEvent = events[eventIndex - 1]
  return event.year !== prevEvent.year
}
