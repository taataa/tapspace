const vec3 = require('affineplane').vec3

module.exports = (Orientation) => {
  return function (basis, xAxis, yAxis) {
    // @Orientation.fromVectorBasis(basis, xAxis)
    //
    // Construct an orientation from basis vectors. For now, x-axis is enough
    // to determine orientation around z-axis.
    //
    // Parameters:
    //   basis
    //     a BasisComponent in which to represent the orientation.
    //   xAxis
    //     a Vector, specifying the direction of x-axis.
    //
    // Return
    //   an Orientation
    //

    // Normalize to basis
    if (xAxis.transitRaw) {
      xAxis = xAxis.transitRaw(basis)
    }

    const xUnit = vec3.unit(xAxis)

    return new Orientation(basis, {
      a: xUnit.x,
      b: xUnit.y
    })
  }
}
