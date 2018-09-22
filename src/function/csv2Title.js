export default (csvArray) => {
  const titles = csvArray[0]
  return {
    title: titles[0],
    subtitle: titles[1]
  }
}
