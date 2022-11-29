const point3 = require('affineplane').point3

module.exports = (Point) => {
  // Use factory pattern to control circular dependency.
  return (basis, points) => {
    // tapspace.geometry.Point.fromAverage(basis, points)
    // tapspace.geometry.Point.fromMean
    //
    // Mean of an array of points.
    //
    // Parameters:
    //   basis
    //     a Basis
    //   points
    //     an array of Point instances
    //
    // Return
    //   a Point on the given basis
    //
    // Example
    // ```
    // const mean = tapspace.Point.fromAverage(basis, points)
    // ```
    //

    // Normalize to point3
    const normPoints = points.map(p => {
      if (p.changeBasis) {
        return p.changeBasis(basis).point
      }
      return p
    })

    const meanPoint = point3.mean(normPoints)
    return new Point(basis, meanPoint)
  }
}
