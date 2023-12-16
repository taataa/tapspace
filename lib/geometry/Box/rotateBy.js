const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (radians, origin) {
  // @Box:rotateBy(radians, origin)
  //
  // Rotate the box around an origin point.
  //
  // Parameters:
  //   radians
  //     a number, the angle in rads
  //   origin
  //     a Point, the transform origin
  //
  // Return
  //   a Box, the rotated box
  //

  // Detect invalid radians: NaN, string
  if (typeof radians !== 'number' || isNaN(radians)) {
    throw new Error('Invalid rotation angle: ' + radians)
  }

  // Normalize
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const robox = box3.rotateBy(this.box, origin, radians)

  const Box = this.constructor
  return new Box(this.basis, robox)
}
