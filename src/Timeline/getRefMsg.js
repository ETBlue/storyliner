export default ({event, refEvent, refEventTitle}) => {
  const msg = event.momentDate.to(refEvent.momentDate, true)
  const prep = event.momentDate.isBefore(refEvent.momentDate) ? 'before' : 'after'
  return `${msg} ${prep} ${refEventTitle}`
}
