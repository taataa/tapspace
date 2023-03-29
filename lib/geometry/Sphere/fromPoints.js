const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = (Sphere) => {
  return function (basis, points) {
    // @Sphere:fromPoints(basis, points)
    //
    // Find the bounding sphere for the given set of points.
    //
    // Parameters:
    //   basis
    //     a Basis for the sphere
    //   points
    //     array of Point
    //
    // Return:
    //   a Sphere
    //

    // Transit the points onto the basis
    const ps = []
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i]
      ps.push(p.transitRaw(basis))
    }
    const len = ps.length

    // TODO use sphere3.findBoundingSphere or similar

    // This is based on Ritter's bounding sphere algorithm.
    // A bit simpler version.

    // Find max x point for initial point
    let maxxPoint = ps[0]
    let maxx = ps[0].x
    for (let i = 1; i < len; i += 1) {
      if (ps[i].x > maxx) {
        maxx = ps[i].x
        maxxPoint = ps[i]
      }
    }

    // Find farthest point from max x point
    let maxDistPoint = maxxPoint
    let maxDist2 = 0
    for (let i = 0; i < len; i += 1) {
      const p = ps[i]
      const dx = (maxxPoint.x - p.x)
      const dy = (maxxPoint.y - p.y)
      const dz = (maxxPoint.z - p.z)
      const dist2 = dx * dx + dy * dy + dz * dz
      if (dist2 > maxDist2) {
        maxDist2 = dist2
        maxDistPoint = p
      }
    }

    // Construct a sphere between these extremes
    let cx = maxDistPoint.x + (maxxPoint.x - maxDistPoint.x) / 2
    let cy = maxDistPoint.y + (maxxPoint.y - maxDistPoint.y) / 2
    let cz = maxDistPoint.z + (maxxPoint.z - maxDistPoint.z) / 2
    let cr = Math.sqrt(maxDist2) / 2
    let cr2 = cr * cr

    // Find farthest point outside the sphere
    let maxOutPoint = null
    let maxOutDist2 = 0
    for (let i = 0; i < len; i += 1) {
      const p = ps[i]
      const dx = (cx - p.x)
      const dy = (cy - p.y)
      const dz = (cz - p.z)
      const dist2 = dx * dx + dy * dy + dz * dz
      if (dist2 > cr2 && dist2 > maxOutDist2) {
        maxOutPoint = p
        maxOutDist2 = dist2
      }
    }

    // If all points already inside
    if (maxOutPoint === null) {
      return new Sphere(basis, { x: cx, y: cy, z: cz, r: cr })
    }

    // Construct a new sphere that contains the farthest outside point

    const boundingBox = box3.getBounds(ps)

    return new Sphere(basis, boundingBox)
  }
}
