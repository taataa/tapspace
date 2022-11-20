const applyTransformOrigin = require('./utils/applyTransformOrigin')

module.exports = function (point) {
  // tapspace.components.AbstractPlane:setAnchor(point)
  //
  // Set the anchor point of the plane. This does not move the plane.
  //
  // Parameters:
  //   point
  //     a point2 on the plane or a Point in its space. The new anchor point.
  //
  // Return
  //   this, for chaining
  //

  // Normalise to point2 on the plane.
  if (point.transitRaw) {
    point = point.transitRaw(this)
  }

  this.anchor = {
    x: point.x,
    y: point.y,
    z: 0
  }

  // The transform-origin follows the anchor.
  // See render for further notes on why.
  applyTransformOrigin(this.element, this.anchor)

  return this
}
