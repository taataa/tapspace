const affineplane = require('affineplane')
const plane3 = affineplane.plane3

module.exports = function (target) {
  // tapspace.components.AbstractPlane:getTransitionToParentOf(target)
  //
  // Get projection to the parent component of the target component.
  // If the target is a root, then projection is to its virtual parent.
  //
  // Parameters
  //   target
  //     an AbstractPlane
  //
  // Return
  //   a plane3, a projection to the real or virtual parent of the target.
  //
  const parent = target.getParent()

  if (parent) {
    return this.getTransitionTo(parent)
  }

  // If the target is a root then we can project to its virtual parent.
  const tran = this.getTransitionTo(target)
  // We need projection from this to the target and then to its parent.
  // Therefore the projection to target must be applied first on the right.
  return plane3.compose(target.plane, tran)
}
