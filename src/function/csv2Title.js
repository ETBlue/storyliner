export default (csvFile) => {
  const titles = csvFile.split('\n')[0].split(',')
  return {
    title: titles[0],
    subtitle: titles[1]
  }
}

