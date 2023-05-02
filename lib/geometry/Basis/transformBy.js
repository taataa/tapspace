const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (tr, origin) {
  // @Basis:transformBy(tr, origin)
  //
  // Transform the virtual basis by a transformation at origin.
  //
  // Parameters:
  //   tr
  //     a Transform, the transformation
  //   origin
  //     optional Point, the transform origin. Defaults to the basis origin.
  //
  // Return
  //   a Basis, the transformed virtual basis
  //

  // Normalize
  if (tr.transitRaw) {
    tr = tr.transitRaw(this.basis)
  }
  if (!origin) {
    origin = { x: this.tran.x, y: this.tran.y, z: this.tran.z }
  } else if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const ttran = plane3.transformBy(this.tran, tr, origin)

  const Basis = this.constructor
  return new Basis(this.basis, ttran)
}
