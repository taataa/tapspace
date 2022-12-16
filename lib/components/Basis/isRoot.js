module.exports = function () {
  // @Basis:isRoot()
  //
  // Test is the basis an affine root i.e.
  // does the element have no affine parent.
  // A root basis can have non-affine parent in DOM.
  //
  // Return
  //   a boolean
  //
  // Complexity
  //   O(1)
  //
  const parent = this.element.parentElement
  if (parent) {
    if (parent.affine) {
      // has affine parent
      return false
    }
    // has parent but it is not affine
    return true
  }
  // is DOM root, so yes.
  return true
}
