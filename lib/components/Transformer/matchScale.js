const fine = require('affineplane')
const helm3 = fine.helm3

module.exports = function (target, pivot) {
  // @Transformer:matchScale(target[, pivot])
  //
  // Dilate this basis so that its scale matches
  // the scale of the target.
  //
  // Parameters:
  //   target
  //     a Basis
  //   pivot
  //     optional Point to use as the transform origin.
  //
  // Return
  //   this, for chaining
  //
  if (!target.atAnchor) {
    throw new Error('Invalid target with to match scale.')
  }

  const helm = this.getTransitionFrom(target)
  const dil = helm3.getDilation(helm)

  this.scaleBy(dil, pivot)

  return this
}
