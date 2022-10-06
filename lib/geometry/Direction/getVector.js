const dir3 = require('affineplane').dir3

module.exports = (Vector) => {
  // Use factory pattern to control circular dependencies.
  return function (magnitude) {
    // tapspace.geometry.Direction:getVector(magnitude)
    //
    // Parameters:
    //   magnitude
    //     a number or Distance, the length of the vector to create.
    //
    // Return
    //   a Vector
    //

    // Normalise distance
    if (typeof magnitude === 'object') {
      if (magnitude.changeBasis) {
        magnitude = magnitude.changeBasis(this.basis).d
      } else {
        throw new Error('Invalid magnitude for vector')
      }
    }

    const v = dir3.toVector(this.dir, magnitude)
    return new Vector(this.basis, v)
  }
}
