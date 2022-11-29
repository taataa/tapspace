const vec3 = require('affineplane').vec3

module.exports = (Distance) => {
  // Use factory pattern to control circular dependency.
  return function () {
    // @Vector:getDistance()
    // @Vector:norm
    //
    // Get vector norm as a Distance.
    //
    // Return
    //   a Distance
    //
    const magn = vec3.norm(this.vec)

    return new Distance(this.basis, magn)
  }
}
