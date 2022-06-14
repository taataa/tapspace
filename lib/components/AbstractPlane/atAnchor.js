const Point = require('../../geometry/Point')
const geom = require('affineplane')

module.exports = function (alt) {
  // Get the plane anchor point or the optional given point on the plane.
  //
  // Parameters:
  //   alt
  //     optional point2 or Point. If given, returns this point instead,
  //     projected onto the plane. Useful way to default a point to the
  //     plane anchor if the point is nullish.
  //
  // Return
  //   a Point
  //

  let anchor
  if (alt) {
    // Use custom anchor
    if (alt.basis) {
      // Normalize onto the plane
      const pr = alt.basis.getProjectionTo(this)
      anchor = geom.proj2.point2(pr, alt) // becomes plain {x,y}
    } else {
      // Assume on the plane already.
      anchor = alt
    }
  } else {
    // Otherwise use the plane anchor
    anchor = this.anchor
  }

  return new Point(this, anchor.x, anchor.y)
}
