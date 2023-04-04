const fine = require('affineplane')
const Orientation = require('../../geometry/Orientation')

module.exports = function () {
  // @Basis:getOrientation()
  //
  // Get the orientation of this virtual basis.
  // Provides a way to match the orientation between components and geometry.
  //
  // Return
  //   an Orientation
  //

  // TODO use affineplane.plane3.getOrientation
  const a = this.tran.a
  const b = this.tran.b
  const scale = Math.sqrt(a * a + b * b)

  let orient
  if (Math.abs(scale) < fine.epsilon) {
    // Default orientation
    orient = { a: 1, b: 0 }
  } else {
    orient = { a: a / scale, b: b / scale }
  }

  return new Orientation(this.basis, orient)
}
