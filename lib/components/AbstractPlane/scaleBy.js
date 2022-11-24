const fine = require('affineplane')

module.exports = function (multiplier, center) {
  // @Plane:scaleBy(multiplier, center)
  //
  // Scale the element.
  //
  // Parameters:
  //   multiplier
  //     a number, the scale multiplier.
  //   center
  //     optional Point. Scaling is performed about this point.
  //     ..Defaults to the plane anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the anchor point.
  center = this.atAnchor(center)

  // The anchor needs to be transited onto parent for affineplane scaleBy
  const centerOnParent = fine.point3.transitFrom(center.point, this.tran)
  // Scale the transition image
  const newTran = fine.plane3.scaleBy(this.tran, centerOnParent, multiplier)
  // Update transition matrix
  this.tran = newTran
  // Update css
  this.renderTransform()

  return this
}
