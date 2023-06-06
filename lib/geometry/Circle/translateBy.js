const fine = require('affineplane')
const circle3 = fine.circle3

module.exports = function (vec) {
  // @Circle:translateBy(vec)
  //
  // Translate the circle by a vector.
  //
  // Parameters:
  //   vec
  //     a Vector, the translation
  //
  // Return
  //   a Circle
  //

  // Normalize
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  // Allow 2D vector
  vec.z = vec.z || 0

  const circle = circle3.translate(this.circle, vec)

  const Circle = this.constructor
  return new Circle(this.basis, circle)
}
