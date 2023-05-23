const plane3 = require('affineplane').plane3

module.exports = function () {
  // @Component:getTransitionToParent()
  //
  // Get a coordinate transition matrix from this basis to its parent basis.
  // If this basis does not have a parent, it is either root affine node in DOM
  // or is not yet added to DOM, and in this case a transition matrix to
  // a virtual parent is returned.
  //
  // Return
  //   a plane3, the coordinate transition matrix from this to parent.
  //
  // Complexity
  //   O(1)
  //
  return plane3.copy(this.tran)
}
