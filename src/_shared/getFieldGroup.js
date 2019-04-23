export default ({event, field}) => {
  const fieldGroup = [field]
  for (let i = 1; event[`${field}_${i}`]; i++) {
    fieldGroup.push(`${field}_${i}`)
  }
  return fieldGroup
}
