const affineplane = require('affineplane')
const proj2 = affineplane.proj2

module.exports = function (target) {
  // tapspace.components.AbstractPlane:getProjectionToParentOf(target)
  //
  // Get projection to the parent component of the target component.
  // If the target is a root, then projection is to its virtual parent.
  //
  // Parameters
  //   target
  //     an AbstractPlane
  //
  // Return
  //   a proj2, a projection to the real or virtual parent of the target.
  //
  const parent = target.getParent()

  if (parent) {
    return this.getProjectionTo(parent)
  }

  // If the target is a root then we can project to its virtual parent.
  const pr = this.getProjectionTo(target)
  // We need projection from this to the target and then to its parent.
  // Therefore the projection to target must be applied first on the right.
  return proj2.compose(target.proj, pr)
}
