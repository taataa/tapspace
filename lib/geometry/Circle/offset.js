const fine = require('affineplane')
const circle3 = fine.circle3

module.exports = function (dx, dy, dz) {
  // @Circle:offset(dx, dy[, dz])
  //
  // Translate the circle by scalars.
  //
  // Parameters:
  //   dx
  //     a number or Distance
  //   dy
  //     a number or Distance
  //   dz
  //     optional number or Distance. Default is zero.
  //
  // Return
  //   a Circle
  //

  // Normalize
  if (dx.transitRaw) {
    dx = dx.transitRaw(this.basis)
  }
  if (dy.transitRaw) {
    dy = dy.transitRaw(this.basis)
  }
  if (dz) {
    if (dz.transitRaw) {
      dz = dz.transitRaw(this.basis)
    }
  } else {
    dz = 0
  }

  const circle = circle3.offset(this.circle, dx, dy, dz)

  const Circle = this.constructor
  return new Circle(this.basis, circle)
}
