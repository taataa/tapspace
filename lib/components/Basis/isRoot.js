module.exports = function () {
  // @Basis:isRoot()
  //
  // Is the element an affine root i.e.
  // the element does not have an affine parent.
  //
  // Return
  //   a boolean
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
