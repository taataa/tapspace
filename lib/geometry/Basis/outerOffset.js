const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (dx, dy, dz) {
  // @Basis:outerOffset(dx, dy[, dz])
  //
  // Create a translated basis.
  // The offset parameters follow the basis element orientation.
  // Useful for changing basis origin, for example.
  //
  // Parameters:
  //   dx
  //     a Distance, the distance along x-axis of the basis element.
  //     a number, a length in the scale of the basis element.
  //   dy
  //     a Distance, the distance along y-axis of the basis element.
  //     a number, a length in the scale of the basis element.
  //   dz
  //     optional Distance, the distance along z-axis of the basis element.
  //     optional number, a length in the scale of the basis element.
  //
  // Return
  //   a Basis
  //

  // Normalise
  if (dx.transitRaw) {
    dx = dx.transitRaw(this.basis)
  }
  if (dy.transitRaw) {
    dy = dy.transitRaw(this.basis)
  }
  if (!dz) {
    dz = 0
  }
  if (dz.transitRaw) {
    dz = dz.transitRaw(this.basis)
  }

  const delta = {
    x: dx,
    y: dy,
    z: dz
  }
  const po = plane3.translateBy(this.tran, delta)

  const Basis = this.constructor
  return new Basis(this.basis, po)
}
