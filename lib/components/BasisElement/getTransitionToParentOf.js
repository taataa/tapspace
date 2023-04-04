const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (target) {
  // @BasisElement:getTransitionToParentOf(target)
  //
  // Get transition from this basis to the parent basis of the target.
  // If the target is a root, then transition is to its virtual parent.
  //
  // Parameters
  //   target
  //     a BasisElement
  //
  // Return
  //   a plane3, a transition to the real or virtual parent of the target.
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree.
  //
  const parent = target.getParent()

  if (parent) {
    return this.getTransitionTo(parent)
  }

  // If the target is a root then we can transit to its virtual parent.
  const tran = this.getTransitionTo(target)
  // We need transition from this to the target and then to its parent.
  // Therefore the transition to target must be applied first on the right.
  return plane3.compose(target.tran, tran)
}
