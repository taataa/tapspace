const sphere3 = require('affineplane').sphere3
const equal = sphere3.equal

module.exports = function (s) {
  // @Sphere:equal(s)
  //
  // Test if this sphere is strictly equal with the given sphere s.
  // Strict equality requires that the spheres are on the same basis
  // and have strictly equal radius and position.
  //
  // Parameters:
  //   s
  //     a Sphere
  //
  // Return
  //   a boolean
  //
  if (!s || !s.basis) {
    return false
  }

  return this.basis === s.basis && equal(this.sphere, s.sphere)
}
