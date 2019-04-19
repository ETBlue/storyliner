import isInViewport from './isInViewport'

export default (eventElements) => {
  const visibleIDs = []
  Array.from(eventElements).forEach((elem) => {
    if (isInViewport(elem)) {
      visibleIDs.push(parseInt(elem.id, 10))
    }
  })
  visibleIDs.sort((a, b) => {
    return a - b
  })
  return visibleIDs
}
