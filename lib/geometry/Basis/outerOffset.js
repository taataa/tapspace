const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (dx, dy, dz) {
  // @Basis:outerOffset(dx, dy[, dz])
  //
  // Create a translated basis based on the element orientation.
  // In other words, the offset parameters follow the element coordinate system.
  // Note that usually you want to depend on the basis orientation, not
  // the element orientation, because the same basis can be represented
  // on any affine element but elements just are where they are.
  // See Basis:offset to offset using the inner basis orientation.
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
