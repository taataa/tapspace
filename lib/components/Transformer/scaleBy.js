const fine = require('affineplane')

module.exports = function (multiplier, pivot) {
  // @Transformer:scaleBy(multiplier[, pivot])
  //
  // Scale the element.
  //
  // Parameters:
  //   multiplier
  //     a number, the scale multiplier.
  //   pivot
  //     optional Point. Scaling is performed about this point.
  //     ..Defaults to the transformer anchor.
  //
  // Return
  //   this, for chaining
  //

  // Detect invalid multiplier: NaN, string, zero
  if (!multiplier || typeof multiplier !== 'number') {
    throw new Error('Invalid scale multiplier: ' + multiplier)
  }

  // Normalize the anchor point.
  pivot = this.atAnchor(pivot)

  // The anchor needs to be transited onto parent for affineplane scaleBy
  const pivotOnParent = fine.point3.transitFrom(pivot.point, this.tran)
  // Scale the transition image
  const newTran = fine.plane3.scaleBy(this.tran, pivotOnParent, multiplier)
  // Update transition matrix
  this.tran = newTran
  // Update css
  this.renderTransform()

  return this
}
