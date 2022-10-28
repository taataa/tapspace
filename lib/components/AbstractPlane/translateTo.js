module.exports = function (point) {
  // tapspace.components.AbstractPlane:translateTo(point)
  //
  // Translate the element along x-, y-, and z-axis so that its anchor
  // matches the given point.
  // Translation does not rotate or scale the element.
  // Translation along z-axis can change the perceived size of the element
  // depending on the viewport projection mode.
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
  const trip = anchor.getVectorTo(point)

  const parent = this.getParent()
  const tripOnParent = trip.changeBasis(parent)

  return this.translateBy(tripOnParent)
}
