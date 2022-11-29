const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // @Vector:add(vec)
  //
  // Vector addition, this plus the given vector.
  //
  // Parameters:
  //   vec
  //     a Vector, or {x,y,z} in the same space.
  //
  // Return
  //   a Vector
  //

  // Normalise to vec3
  if (vec.changeBasis) {
    vec = vec.changeBasis(this.basis).vec
  }

  const sum = vec3.add(this.vec, vec)

  const Vector = this.constructor
  return new Vector(this.basis, sum)
}
