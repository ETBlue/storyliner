export default ({event}) => {
  return (event.channel && event.channel.length > 0) || (event.channel_carrier && event.channel_carrier.length > 0)
}
