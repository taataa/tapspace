const vec3 = require('affineplane').vec3

module.exports = (Distance) => {
  return function (vec) {
    // tapspace.geometry.Vector:dot(vec)
    //
    // Get dot product with another vector.
    //
    // Parameters:
    //   vec
    //     a Vector, or {x,y,z} in the same space.
    //
    // Return
    //   a Distance
    //

    // Normalise to vec3.
    if (vec.transitRaw) {
      vec = vec.transitRaw(this.basis)
    }

    const vd = vec3.dot(this.vec, vec)

    return new Distance(this.basis, vd)
  }
}
