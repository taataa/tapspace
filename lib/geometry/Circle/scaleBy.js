const fine = require('affineplane')
const circle3 = fine.circle3

module.exports = function (multiplier, origin) {
  // @Circle:scaleBy(multiplier, origin)
  //
  // Scale the circle about an origin point.
  //
  // Parameters:
  //   multiplier
  //     a number, the scaling factor
  //   origin
  //     optional Point, the transform origin. Defaults to circle center.
  //
  // Return
  //   a Circle
  //

  if (origin) {
    if (origin.transitRaw) {
      origin = origin.transitRaw(this.basis)
    }
  } else {
    origin = {
      x: this.circle.x,
      y: this.circle.y,
      z: this.circle.z
    }
  }

  const circle = circle3.homothety(this.circle, origin, multiplier)

  const Circle = this.constructor
  return new Circle(this.basis, circle)
}
