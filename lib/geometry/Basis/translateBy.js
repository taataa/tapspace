const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (vec) {
  // @Basis:translateBy(vec)
  //
  // Translate the virtual basis by a vector.
  //
  // Parameters:
  //   vec
  //     a Vector, the translation
  //
  // Return
  //   a Basis, the translated virtual basis
  //

  // Normalize
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  const ttran = plane3.translateBy(this.tran, vec)

  const Basis = this.constructor
  return new Basis(this.basis, ttran)
}
