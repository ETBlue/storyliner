export default (text) => {
  const titles = text.split('\n')[0].split(',')
  return {
    title: titles[0],
    subtitle: titles[1]
  }
}

