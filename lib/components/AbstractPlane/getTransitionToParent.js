module.exports = function () {
  // tapspace.components.AbstractPlane:getTransitionToParent()
  //
  // Return a transition from the coordinate system of the element
  // to its parent.
  //
  // TODO what if parent is non-affine
  //
  return {
    a: this.plane.a, // copy
    b: this.plane.b,
    x: this.plane.x,
    y: this.plane.y,
    z: this.plane.z
  }
}
