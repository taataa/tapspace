const plane3 = require('affineplane').plane3

module.exports = function () {
  // tapspace.components.AbstractPlane:getTransitionToParent()
  //
  // Return a transition from the coordinate system of the element
  // to its parent.
  //
  // TODO what if parent is non-affine
  //
  return plane3.copy(this.tran)
}
