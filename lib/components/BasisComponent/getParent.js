module.exports = function () {
  // @BasisComponent:getParent()
  //
  // Get the affine parent of the plane. Null if no affine parent.
  //
  // Return
  //   a BasisComponent, the parent.
  //   null if no affine parent.
  //
  // Complexity:
  //   O(1)
  //
  const domParent = this.element.parentElement
  if (domParent && domParent.affine) {
    return domParent.affine
  }
  return null
}