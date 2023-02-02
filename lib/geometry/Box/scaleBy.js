const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (multiplier, origin) {
  // @Box:scaleBy(multiplier, origin)
  //
  // Scale the box about an origin point.
  //
  // Parameters:
  //   multiplier
  //     a number, the scaling factor
  //   origin
  //     a Point, the transform origin
  //
  // Return
  //   a Box, the scaled box
  //

  // The origin needs to be transited into outer basis of the box
  // for the affineplane scaleBy to work.
  // The outer basis of the box is the inner basis of Box... x_x
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const box = box3.homothety(this.box, origin, multiplier)

  const Box = this.constructor
  return new Box(this.basis, box)
}
