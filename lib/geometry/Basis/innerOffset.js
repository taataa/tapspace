const fine = require('affineplane')
const vec3 = fine.vec3
const plane3 = fine.plane3

module.exports = function (dx, dy, dz) {
  // @Basis:innerOffset(dx, dy[, dz])
  //
  // Create a translated basis.
  // The offset parameters follow the inner basis orientation.
  // Useful for changing basis origin towards an anchor for example.
  //
  // Parameters:
  //   dx
  //     a Distance, the distance along x-axis of the inner basis.
  //     a number, a length in the scale of the inner basis.
  //   dy
  //     a Distance, the distance along y-axis of the inner basis.
  //     a number, a length in the scale of the inner basis.
  //   dz
  //     optional Distance, the distance along z-axis of the inner basis.
  //     optional number, a length in the scale of the inner basis.
  //
  // Return
  //   a Basis
  //

  // Scale to inner basis.
  const scaler = plane3.getScale(this.tran)

  // Normalise
  if (dx.transitRaw) {
    dx = dx.transitRaw(this.basis) / scaler
  }
  if (dy.transitRaw) {
    dy = dy.transitRaw(this.basis) / scaler
  }
  if (!dz) {
    dz = 0
  }
  if (dz.transitRaw) {
    dz = dz.transitRaw(this.basis) / scaler
  }

  const delta = {
    x: dx,
    y: dy,
    z: dz
  }
  const deltaOuter = vec3.transitFrom(delta, this.tran)
  const po = plane3.translateBy(this.tran, deltaOuter)

  const Basis = this.constructor
  return new Basis(this.basis, po)
}
