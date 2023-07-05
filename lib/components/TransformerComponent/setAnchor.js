const applyTransformOrigin = require('./dom/applyTransformOrigin')

module.exports = function (point, y) {
  // @TransformerComponent:setAnchor(point)
  //
  // Set the transformer anchor point. This does not move the element.
  //
  // Parameters:
  //   point
  //     a Point, or a point2 on the basis. The new anchor point.
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
    point = { x: point, y }
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
