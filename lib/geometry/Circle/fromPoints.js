const circle3 = require('affineplane').circle3

module.exports = (Circle) => {
  return function (basis, points) {
    // @Circle:fromPoints(basis, points)
    //
    // Find an approximate bounding circle for the given set of points.
    // Reads only x and y. The circle has z coordinate at the basis origin.
    // The circle contains all the points but can be larger than minimal.
    // Empty array will return zero-size circle at origin.
    //
    // Parameters:
    //   basis
    //     a Component for the circle
    //   points
    //     array of Point
    //
    // Return:
    //   a Circle
    //

    if (points.length === 0) {
      return new Circle(basis, sphere3.ZERO)
    }

    // Transit the points onto the basis
    const ps = []
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i]
      ps.push(p.transitRaw(basis))
    }
    const len = ps.length

    // TODO use circle3.boundingCircle

    // Find bounding box and use its center point for the circle.
    let minx = ps[0].x
    let maxx = ps[0].x
    let miny = ps[0].y
    let maxy = ps[0].y
    for (let i = 1; i < len; i += 1) {
      const p = ps[i]
      minx = Math.min(minx, p.x)
      maxx = Math.max(maxx, p.x)
      miny = Math.min(miny, p.y)
      maxy = Math.max(maxy, p.y)
    }
    // The circle center
    const cx = minx + (maxx - minx) / 2
    const cy = miny + (maxy - miny) / 2

    // Find distance to the farthest point
    let maxDist2 = 0
    for (let i = 0; i < len; i += 1) {
      const p = ps[i]
      const dx = (cx - p.x)
      const dy = (cy - p.y)
      const dist2 = dx * dx + dy * dy
      if (dist2 > maxDist2) {
        maxDist2 = dist2
      }
    }
    // The circle radius
    const cr = Math.sqrt(maxDist2)

    return new Circle(basis, {
      x: cx,
      y: cy,
      z: 0,
      r: cr
    })
  }
}
