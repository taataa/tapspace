const AffineCircle = require('./index')

module.exports = (radius, color) => {
  // tapspace.circle(radius, color)
  // tapspace.createCircle
  //
  // Make a circle-shaped element.
  //
  // Parameters:
  //   radius
  //     a number
  //   color
  //     a CSS color string
  //
  // Return
  //   a Circle
  //
  return new AffineCircle(radius, color)
}
