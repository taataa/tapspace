const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = function (vec) {
  // @Sphere:translateBy(vec)
  //
  // Translate the sphere by a vector.
  //
  // Parameters:
  //   vec
  //     a Vector, the translation
  //
  // Return
  //   a Sphere, the translated sphere
  //

  // Normalize
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  // Allow 2D vector
  vec.z = vec.z || 0

  const sphere = sphere3.translate(this.sphere, vec)

  const Sphere = this.constructor
  return new Sphere(this.basis, sphere)
}
