const COLORSPACE = 30
const COLORS = []
for (let i = 0; i < 360 / COLORSPACE; i++) {
  COLORS.push(i * COLORSPACE)
}

export default COLORS
