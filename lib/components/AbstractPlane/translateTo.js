const affineplane = require('affineplane')

module.exports = function (point) {
  // tapspace.components.AbstractPlane:translateTo(point)
  //
  // Translate the element anchor along x-, y-, and z-axis to the given point.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element.
  //
  // Parameters
  //   point
  //     a Point.
  //
  // Return
  //   this, for chaining
  //

  if (!point.basis) {
    throw new Error('Invalid point. Point must have basis.')
  }

  const anchor = this.atAnchor()
  const trip = anchor.vectorTo(point)

  const parent = this.getParent()
  const tripOnParent = trip.changeBasis(parent)

  return this.translateBy(tripOnParent)
}
