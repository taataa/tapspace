const fine = require('affineplane')
const plane3 = fine.plane3

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

  // Normalize
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  // TODO use affineplane.box3.rotateBy
  const robox = plane3.rotateBy(this.box, origin, radians)
  // Patch with sizes
  robox.w = this.box.w
  robox.h = this.box.h
  robox.d = this.box.d

  const Box = this.constructor
  return new Box(this.basis, robox)
}
