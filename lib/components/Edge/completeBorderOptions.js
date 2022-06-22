const toPx = require('to-px')
const cssBorder = require('./cssBorder')

module.exports = (border) => {
  // Normalise border argument.
  //
  // Parameters:
  //   border
  //     optional string, a CSS border value e.g. '2px solid red'
  //     optional object, { width, style, color }
  //
  // Return
  //   complete border object
  //
  const defaultBorder = {
    width: 1,
    style: 'solid',
    color: 'black'
  }

  if (!border) {
    return defaultBorder
  }

  // Parse string
  if (typeof border === 'string') {
    const props = cssBorder.parse(border)
    return {
      width: toPx(props.width),
      style: props.style,
      color: props.color
    }
  }

  // Modify copy only
  border = Object.assign({}, border)

  // Handle width prop
  switch (typeof border.width) {
    case 'string':
      border.width = toPx(border.width)
      break
    case 'number':
      // no-op
      break
    default:
      border.width = defaultBorder.width
  }

  // Handle style prop
  switch (typeof border.style) {
    case 'string':
      // no-op
      break
    default:
      border.style = defaultBorder.style
  }

  // Handle color prop
  switch (typeof border.color) {
    case 'string':
      // no-op
      break
    default:
      border.color = defaultBorder.color
  }

  return border
}
