module.exports = (Sphere) => {
  return function (basis, points) {
    // @Sphere:fromPoints(basis, points)
    //
    // Find an approximate bounding sphere for the given set of points.
    // The sphere contains all the points but can be larger than minimal.
    // Empty array will return zero-size sphere at origin.
    //
    // Parameters:
    //   basis
    //     a BasisComponent for the sphere
    //   points
    //     array of Point
    //
    // Return:
    //   a Sphere
    //

    if (points.length === 0) {
      // TODO sphere3.ZERO .ORIGIN
      return new Sphere(basis, { x: 0, y: 0, z: 0, r: 0 })
    }

    // Transit the points onto the basis
    const ps = []
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i]
      ps.push(p.transitRaw(basis))
    }
    const len = ps.length

    // TODO use sphere3.findBoundingSphere or similar

    // Find bounding box and use its center point for the circle.
    let minx = ps[0].x
    let maxx = ps[0].x
    let miny = ps[0].y
    let maxy = ps[0].y
    let minz = ps[0].z
    let maxz = ps[0].z
    for (let i = 1; i < len; i += 1) {
      const p = ps[i]
      minx = Math.min(minx, p.x)
      maxx = Math.max(maxx, p.x)
      miny = Math.min(miny, p.y)
      maxy = Math.max(maxy, p.y)
      minz = Math.min(minz, p.z)
      maxz = Math.max(maxz, p.z)
    }
    // The circle center
    const cx = minx + (maxx - minx) / 2
    const cy = miny + (maxy - miny) / 2
    const cz = minz + (maxz - minz) / 2

    // Find distance to the farthest point
    let maxDist2 = 0
    for (let i = 0; i < len; i += 1) {
      const p = ps[i]
      const dx = (cx - p.x)
      const dy = (cy - p.y)
      const dz = (cz - p.z)
      const dist2 = dx * dx + dy * dy + dz * dz
      if (dist2 > maxDist2) {
        maxDist2 = dist2
      }
    }
    // The sphere radius
    const cr = Math.sqrt(maxDist2)

    return new Sphere(basis, {
      x: cx,
      y: cy,
      z: cz,
      r: cr
    })
  }
}
