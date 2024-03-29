const fine = require('affineplane')
const box3 = fine.box3

module.exports = (Box) => {
  return function (basis, points) {
    // @Box:fromPoints(basis, points)
    //
    // Find the bounding box for the given set of points.
    // The bounding box has the orientation of the given basis.
    // Empty array will return zero-size box at origin.
    //
    // Parameters:
    //   basis
    //     a Component for the box
    //   points
    //     array of Point
    //
    // Return:
    //   a Box
    //

    if (points.length === 0) {
      return new Box(basis, box3.ZERO)
    }

    const ps = []
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i]
      if (p.transitRaw) {
        ps.push(p.transitRaw(basis))
      } else {
        // Assume point3 on the basis
        ps.push(p)
      }
    }
    // points now on basis

    const boundingBox = box3.fromPoints(ps)

    return new Box(basis, boundingBox)
  }
}
