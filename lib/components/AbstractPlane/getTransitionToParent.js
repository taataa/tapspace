module.exports = function () {
  // tapspace.components.AbstractPlane:getTransitionToParent()
  //
  // Return a transition from the coordinate system of the element
  // to its parent.
  //
  // TODO what if parent is non-affine
  //
  return {
    a: this.tran.a, // copy
    b: this.tran.b,
    x: this.tran.x,
    y: this.tran.y,
    z: this.tran.z
  }
}
