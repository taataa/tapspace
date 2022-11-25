const Point = require('../../geometry/Point')
const point2 = require('affineplane').point2

module.exports = function (alt) {
  // @Plane:atAnchor(alt)
  //
  // Get the plane anchor point or the optional given point on the plane.
  //
  // Parameters:
  //   alt
  //     optional point2 or Point. If given, returns this point instead,
  //     after transited onto the plane. Useful way to default a point to the
  //     plane anchor if the point is nullish.
  //
  // Return
  //   a Point
  //

  let anchor
  if (alt) {
    // Use custom anchor
    if (alt.transitRaw) {
      // Normalize onto the plane
      anchor = alt.transitRaw(this) // becomes plain {x,y}
    } else if (point2.validate(alt)) {
      // Assume valid point and that the point is on the plane already.
      anchor = alt
    } else {
      throw new Error('Invalid alternative anchor point: ' + alt)
    }
  } else {
    // Otherwise use the plane anchor
    anchor = this.anchor
  }

  return new Point(this, anchor)
}