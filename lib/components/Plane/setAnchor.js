const applyTransformOrigin = require('./dom/applyTransformOrigin')

module.exports = function (point, y) {
  // @Plane:setAnchor(point)
  //
  // Set the anchor point of the plane. This does not move the plane.
  //
  // Parameters:
  //   point
  //     a point2 on the plane or a Point. The new anchor point.
  //
  // Return
  //   this, for chaining
  //

  // Normalise
  if (typeof point === 'object') {
    // Allow point2 or Point
    if (point.transitRaw) {
      point = point.transitRaw(this)
    }
  } else if (typeof point === 'number' && typeof y === 'number') {
    // Allow number arguments
    point = { x: point, y: y }
  } else {
    // DEBUG
    throw new Error('Invalid point')
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
