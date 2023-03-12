const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = function (dx, dy, dz) {
  // @Sphere:offset(dx, dy[, dz])
  //
  // Translate the sphere by scalars.
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
  //   a Sphere, the offset sphere
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

  const sphere = sphere3.offset(this.sphere, dx, dy, dz)

  const Sphere = this.constructor
  return new Sphere(this.basis, sphere)
}
