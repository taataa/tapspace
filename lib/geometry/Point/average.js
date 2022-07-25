const geom = require('affineplane')

module.exports = (Point) => {
  // This is a stupid way to include class to avoid circular includes.

  return (basis, points) => {
    // tapspace.geometry.Point.fromAverage(basis, points)
    //
    // Mean of an array of points.
    //
    // Parameters:
    //   basis
    //     a Plane
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
    const normPoints = points.map(p => p.projectTo(basis))
    const meanPoint = geom.point2.mean(normPoints)
    return new Point(basis, meanPoint.x, meanPoint.y)
  }
}
