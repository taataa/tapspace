module.exports = function () {
  // Get the affine parent of the plane. Null if no affine parent.
  //
  // Return
  //   an AbstractPlane
  //
  const domParent = this.element.parentElement
  if (domParent.affine) {
    return domParent.affine
  }
  return null
}
