const Point = require('../../geometry/Point')
const point2 = require('affineplane').point2

module.exports = function (alt) {
  // @TransformerComponent:atAnchor(alt)
  //
  // Get the transformer anchor point. This is practically the center of mass
  // of the component. Transformations that apply a pivot point, will default
  // to the anchor point.
  //
  // Optionally, this method can be used to normalize undefined points
  // to the anchor.
  //
  // Parameters:
  //   alt
  //     optional point2 or Point. If given, returns this point instead,
  //     .. after transited onto the basis.
  //     .. Useful way to default a point to the
  //     .. plane anchor if the point is nullish.
  //
  // Return
  //   a Point
  //

  let anchor
  if (alt) {
    // Use custom anchor
    if (alt.transitRaw) {
      // Normalize
      anchor = alt.transitRaw(this) // becomes plain {x,y,z}
    } else if (point2.validate(alt)) {
      // Assume alt is valid point and that it is on the basis already.
      anchor = alt
    } else {
      throw new Error('Invalid alternative anchor point: ' + alt)
    }
  } else {
    // Otherwise use the transformer anchor
    anchor = this.anchor
  }

  return new Point(this, anchor)
}
