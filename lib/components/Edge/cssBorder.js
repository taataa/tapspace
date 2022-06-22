const widthPattern = /(\d+.?\d*)(\w{2,4})/i
const styleKeywords = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset'
]

exports.parse = (str) => {
  // Parse object from CSS border string
  //
  // Parameters
  //   str
  //     a CSS border value string
  //
  // Return
  //   object { width, style, color }
  //

  const parts = str.trim().split(' ')
  const border = {
    width: '1px',
    style: 'solid',
    color: 'black'
  }

  while (parts.length) {
    const part = parts.pop().trim()
    const isWidth = widthPattern.test(part)
    if (isWidth) {
      border.width = part
    } else {
      const isStyle = (styleKeywords.indexOf(part) > -1)
      if (isStyle) {
        border.style = part
      } else {
        border.color = part
      }
    }
  }

  return border
}

exports.stringify = (border) => {
  return border.width + 'px ' +
    border.style + ' ' +
    border.color
}
