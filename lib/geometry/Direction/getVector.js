const dir3 = require('affineplane').dir3

module.exports = (Vector) => {
  // Use factory pattern to control circular dependencies.
  return function (magnitude) {
    // tapspace.geometry.Direction:getVector(magnitude)
    //
    // Create a vector from direction by giving it a length.
    //
    // Parameters:
    //   magnitude
    //     a number or Distance, the length of the vector to create.
    //     A negative magnitude creates a vector to opposite direction.
    //
    // Return
    //   a Vector
    //

    // Normalise distance
    if (typeof magnitude === 'object') {
      if (magnitude.transitRaw) {
        magnitude = magnitude.transitRaw(this.basis)
      } else {
        throw new Error('Invalid magnitude for vector')
      }
    }

    const v = dir3.toVector(this.dir, magnitude)
    return new Vector(this.basis, v)
  }
}
