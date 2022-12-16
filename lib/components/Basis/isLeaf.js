module.exports = function () {
  // @Basis:isLeaf()
  //
  // This basis is a leaf if it has no affine children in DOM.
  // A leaf can have non-affine children in DOM.
  // A basis that is not a leaf has one or more affine children and
  // may also have non-affine chilren.
  //
  // Return
  //   a boolean, true if the basis has no affine children.
  //
  // Complexity
  //   O(c) where c is the number of children.
  //
  return this.getChildren().length === 0
}
