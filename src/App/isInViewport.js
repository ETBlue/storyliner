// thanks to Lewis Cowles: https://medium.com/@LewisCowles1/i-also-used-the-concept-but-abandoned-jquery-for-vanilla-js-b55f638586fe

export default (elem) => {
  let elemTop = elem.offsetTop
  let elemBottom = elemTop + elem.offsetHeight
  let viewportTop = window.scrollY
  let viewportBottom = viewportTop + window.innerHeight
  return elemBottom > viewportTop && elemTop < viewportBottom
}
