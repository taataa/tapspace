const vec3 = require('affineplane').vec3

module.exports = (Vector) => {
  // Include Vector class this way to avoid circular dependencies.

  return (basis, vecs) => {
    // @Vector.fromAverage(vecs)
    //
    // Parameters:
    //   basis
    //     a BasisComponent, the basis for the vector to return.
    //     .. In other words, the given vectors will be transited to
    //     .. this basis and then averaged.
    //   vecs
    //     array of Vector
    //
    // Return
    //   a Vector, on the given basis.
    //

    // Normalize to vec3.
    vecs = vecs.map((v) => {
      if (v.transitRaw) {
        return v.transitRaw(basis)
      }
      return v
    })

    const avec = vec3.average(vecs)

    return new Vector(basis, avec)
  }
}
