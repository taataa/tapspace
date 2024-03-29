const fine = require('affineplane')

module.exports = function (multiplier, pivot) {
  // @Hyperspace:scaleBy(multiplier, pivot)
  //
  // Scale the hyperspace with respect to the viewport.
  //
  // Parameters:
  //   multiplier
  //     a number, the scale multiplier.
  //   pivot
  //     a Point. Scaling is performed about this point. Required.
  //
  // Return
  //   this, for chaining
  //

  // Detect invalid multiplier: NaN, string, zero
  if (!multiplier || typeof multiplier !== 'number') {
    throw new Error('Invalid scale multiplier: ' + multiplier)
  }

  // Normalize the origin.
  if (pivot.transitRaw) {
    pivot = pivot.transitRaw(this)
  }

  // The pivot needs to be transited onto viewport for affineplane scaleBy
  const pivotOnView = fine.point3.transitFrom(pivot, this.tran)
  // Scale the hyperspace transition image
  const newTran = fine.plane3.scaleBy(this.tran, pivotOnView, multiplier)
  // Update transition matrix
  this.tran = newTran
  // Update css transform
  this.renderTransform()
  // Emit viewport idle after transforms
  this.viewport.requestIdle()

  return this
}
