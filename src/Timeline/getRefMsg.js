export default ({event, refEvent, refEventTitle}) => {
  const msg = event.momentDate.to(refEvent.momentDate, true)
  let timeTo
  if (event.momentDate.isBefore(refEvent.momentDate)) {
    timeTo = `${msg} before`
  } else if (event.momentDate.isAfter(refEvent.momentDate)) {
    timeTo = `${msg} after`
  } else {
    timeTo = 'same day as'
  }
  return `${timeTo} ${refEventTitle}`
}
