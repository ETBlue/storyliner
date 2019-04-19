export default ({event}) => {
  return (event.location && event.location.length > 0) || (event.location_1 && event.location_1.length > 0)
}
